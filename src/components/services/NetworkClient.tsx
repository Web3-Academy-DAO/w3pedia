import axios, { AxiosRequestHeaders } from "axios"
import { Store } from "redux"
import { defaultStore, RootState } from "./Store";

const NetworkClient = {
  setup(store: Store<RootState>) {
    axios.interceptors.request.use(
      (conf) => {
        console.log("Making [" + conf.method + "] request: " + conf.url);
        let authState = store.getState().auth;

        if (authState.authenticated == true) {
          let headers: AxiosRequestHeaders = {
            Authorization: `Bearer ${authState.token}`
          }
          conf.headers = headers;
        }
        return conf;
      }, (error) => {
        return Promise.reject(error);
      }
    );

    axios.interceptors.response.use(
      (next) => {
        return Promise.resolve(next);
      },
      (error) => {
        if (error.response.status == 403) {
          console.log("403 error - should logout")
        } else {
          console.log(`An error has occurred ${error.response.data.error.message}`)
        }
        return Promise.reject(error);
      }
    );
  },

  makeLogin(username: string, password: string) {
    this.makePost("/api/auth/local", { identifier: username, password: password }, (resp) => {
      defaultStore.dispatch({
        type: "auth/setLoginState",
        payload: {
          user: resp.data.user,
          token: resp.data.jwt
        }
      })
    })
  },

  makeLogout() {
    defaultStore.dispatch({ type: "auth/setLogoutState" })
  },

  makeGet(url: string, params: { [key: string]: any }, page: number, size: number, callback: (resp: any) => void): void {
    params["pagination[page]"] = page;
    params["pagination[pageSize]"] = size;

    axios({
      method: "get",
      url: url,
      params,
    })
      .then((resp) => {
        callback(resp);
      })
      .catch((error) => {
        console.error("API request failed: " + error.message);
      });
  },

  makePost(url: string, data: { [key: string]: any }, callback: (resp: any) => void): void {
    axios
      .post(url, data)
      .then((resp) => {
        callback(resp);
      })
      .catch((error) => {
        console.error("API request failed: " + error.message);
      });
  }
}

export default NetworkClient