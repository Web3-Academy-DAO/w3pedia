import React, { FC, useEffect, useMemo, useState } from "react";
import { MainLayout } from "../components/layouts";
import { TagData, BlockChainData, CategoryData } from "../components/atoms/DataInterface"
import NetworkClient from "../components/services/NetworkClient";
import { CheckCircleIcon } from "@heroicons/react/solid";
import { useAppDispatch } from "../components/services/Store";
import { showError, hideError } from "../components/services/ErrorModalSlice";

interface SubmissionFormDataGridProps {
  data: (TagData | BlockChainData | CategoryData)[]
  single?: boolean
  onChange?: (data: (TagData | BlockChainData | CategoryData)[]) => void
}

const SubmissionFormDataGrid: FC<SubmissionFormDataGridProps> = ({ data = [], single = false, onChange = () => { } }: SubmissionFormDataGridProps) => {
  const [selectedData, setSelectedData] = useState<(TagData | BlockChainData | CategoryData)[]>([])

  const isSelected = (e: (TagData | BlockChainData | CategoryData)) => {
    return selectedData.filter((item) => item.id == e.id).length > 0
  }

  const onClick = (e: (TagData | BlockChainData | CategoryData)) => {
    let found = selectedData.filter((item) => item.id == e.id);

    if (found.length > 0) {
      let newSelectedData = selectedData.filter((item) => item.id != e.id);
      setSelectedData([...newSelectedData])
      onChange([...newSelectedData])
    } else {
      if (selectedData.length > 0 && single) {
        setSelectedData([e])
        onChange([e])
      } else {
        let newSelectedData = [...selectedData]
        newSelectedData.push(e)
        setSelectedData(newSelectedData)
        onChange(newSelectedData)
      }
    }
  }

  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-3 md:gap-2 content-start items-start">
      {data.map((item, index) => {
        return (
          <div
            key={index}
            className={`w-full text-sm px-2 py-3 rounded-md cursor-pointer hover:bg-violet-800 ${isSelected(item) ? "bg-violet-800 border-r-8 border-slate-500" : "bg-gray-700"}`}
            onClick={() => onClick(item)}>
            {item.name}
          </div>
        )
      })}
    </div >
  )
}

const SubmissionForm = () => {
  const [tags, setTags] = useState<TagData[]>([])
  const [selectedTags, setSelectedTags] = useState<TagData[]>([])
  const [blockChains, setBlockChains] = useState<BlockChainData[]>([])
  const [selectedBlockChains, setSelectedBlockChains] = useState<BlockChainData[]>([])
  const [categories, setCategories] = useState<CategoryData[]>([])
  const [selectedCategories, setSelectedCategories] = useState<CategoryData[]>([])
  const [formDataName, setFormDataName] = useState<string | null>(null)
  const [formDataDescription, setFormDataDescription] = useState<string | null>(null)
  const [formDataWebsite, setFormDataWebsite] = useState<string | null>(null)
  const [formDataTwitter, setFormDataTwitter] = useState<string | null>(null)
  const [formDataDiscord, setFormDataDiscord] = useState<string | null>(null)
  const [heroFile, setHeroFile] = useState<Blob | null>(null);
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [formReady, setFormReady] = useState(false)
  const dispatch = useAppDispatch()

  useMemo(() => {
    if (selectedBlockChains.length <= 0 || selectedCategories.length <= 0 || selectedTags.length <= 0) return

    if (
      selectedBlockChains.length > 0 &&
      selectedCategories.length > 0 &&
      selectedTags.length > 0 &&
      formDataName != undefined && formDataName?.length > 0 &&
      formDataDescription != undefined && formDataDescription?.length > 0 &&
      formDataWebsite != undefined && formDataWebsite?.length > 0 &&
      formDataTwitter != undefined && formDataTwitter?.length > 0 &&
      formDataDiscord != undefined && formDataDiscord?.length > 0 &&
      heroFile != null
    ) {
      setFormReady(true)
    } else {
      setFormReady(false)
    }
  }, [heroFile, selectedTags, selectedBlockChains, selectedCategories, formDataName, formDataTwitter, formDataWebsite, formDataDiscord, formDataDescription])

  const onSubmit = () => {
    let data = {
      name: formDataName,
      slug: formDataName?.toLowerCase().replace(" ", "_"),
      description: formDataDescription,
      website: formDataWebsite,
      twitter: formDataTwitter,
      discord: formDataDiscord,
      tags: selectedTags.map((tag) => tag.id),
      blockchains: selectedBlockChains.map((blockChain) => blockChain.id),
      category: categories[0].id,
      logo: 0,
    }

    setLoading(true)
    NetworkClient.makeUpload("/api/upload", heroFile, (resp) => {
      if (resp.data == undefined || resp.data == null || resp.data.length <= 0) return
      data.logo = resp.data[0].id

      NetworkClient.makePost("/api/tools", { data: data }, (resp) => {
        setLoading(false)
        setSubmitted(true)
      }, (error) => {
        setLoading(false)
        console.log(error.message)
        dispatch(showError({ message: error.message }))
      })
    }, (error) => {
      setLoading(false)
      dispatch(showError({ message: error.message }))
    })
  }

  const onFileRemove = () => {
    setHeroFile(null)
  }

  const onFileAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files == null || e.target.files.length <= 0) return
    setHeroFile(e.target.files[0])
  }

  const loadTagData = () => {
    NetworkClient.makeGet("/api/tags", {}, 0, 999, (resp) => {
      let tagData = resp?.data?.data?.map((item: any) => { return { id: item?.id, name: item?.attributes.name } })
      setTags(tagData)
    })
  }

  const loadBlockChainData = () => {
    NetworkClient.makeGet("/api/blockchains", {}, 0, 999, (resp) => {
      let blockChainData = resp?.data?.data?.map((item: any) => {
        return {
          id: item?.id,
          name: item?.attributes.name,
          website: item?.attributes.website
        }
      })
      setBlockChains(blockChainData)
    })
  }

  const loadCategoryData = () => {
    NetworkClient.makeGet("/api/categories", {}, 0, 999, (resp) => {
      let categoryData = resp?.data?.data?.map((item: any) => { return { id: item?.id, name: item?.attributes.name } })
      setCategories(categoryData)
    })
  }

  useEffect(() => {
    loadTagData()
    loadBlockChainData()
    loadCategoryData()
  }, [])

  return (
    <div className="flex justify-center">
      <div className={`${submitted ? "flex" : "hidden"} container flex-col items-center gap-4 bg-[#343038] md:w-4/6 my-[10%] rounded-2xl text-white text-center px-4`}>
        <h1 className="pt-16 text-2xl">Thank You!</h1>
        <div className="pb-10 w-3/4">
          <p>Your new tool information has been received.</p>
          <p>Please wait while we review and process the data.</p>
          <CheckCircleIcon className="w-16 h-16 fill-green-500 mx-auto m-5" />
        </div>
      </div>
      <div className={`${submitted ? "hidden" : "flex"} container  flex-col items-center gap-4 bg-[#343038] md:w-4/6 my-10 rounded-2xl text-white px-4`}>
        <h1 className="pt-10 text-2xl">Submit New Tool</h1>
        <div className="w-full text-lg font-semibold">Step 1: Select a Category</div>
        <div className="w-full">
          <SubmissionFormDataGrid data={categories} single={true} onChange={(data) => setSelectedCategories(data)} />
        </div>
        <div className="w-full text-lg font-semibold">Step 2: Select Use-cases</div>
        <div className="w-full">
          <SubmissionFormDataGrid data={tags} onChange={(data) => setSelectedTags(data)} />
        </div>
        <div className="w-full text-lg font-semibold">Step 3: Select Blockchains</div>
        <div className="w-full">
          <SubmissionFormDataGrid data={blockChains} onChange={(data) => setSelectedBlockChains(data)} />
        </div>
        <div className="w-full text-lg font-semibold">Step 4: Fill In Information</div>
        <div className="w-full">
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-sm font-semi-bold md:text-right mb-1 md:mb-0 pr-4">
                Name
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                disabled={loading}
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                type="text"
                onChange={(e) => setFormDataName(e.target.value)} />
            </div>
          </div>

          <div className="md:flex md:items-start mb-6">
            <div className="md:w-1/3">
              <label className="block text-sm font-semi-bold md:text-right mb-1 md:mb-0 pr-4">
                Description
              </label>
            </div>
            <div className="md:w-2/3">
              <textarea
                disabled={loading}
                rows={4}
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                onChange={(e) => setFormDataDescription(e.target.value)} />
            </div>
          </div>

          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-sm font-semi-bold md:text-right mb-1 md:mb-0 pr-4">
                Website
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                disabled={loading}
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                type="text"
                onChange={(e) => setFormDataWebsite(e.target.value)} />
            </div>
          </div>

          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-sm font-semi-bold md:text-right mb-1 md:mb-0 pr-4">
                Twitter
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                disabled={loading}
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                type="text"
                onChange={(e) => setFormDataTwitter(e.target.value)} />
            </div>
          </div>

          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-sm font-semi-bold md:text-right mb-1 md:mb-0 pr-4">
                Discord
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                disabled={loading}
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                type="text"
                onChange={(e) => setFormDataDiscord(e.target.value)} />
            </div>
          </div>

          <div className="md:flex md:items-start mb-6">
            <div className="md:w-1/3">
              <label className="block text-sm font-semi-bold md:text-right mb-1 md:mb-0 pr-4">
                Logo
              </label>
            </div>
            <div className="md:w-2/3">
              <div className="flex flex-col">
                <div className="h-32 w-full relative items-center bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                  <input disabled={loading} type="file" onChange={onFileAdd} className="h-full w-full bg-green-200 opacity-0 z-10 absolute cursor-pointer" />
                  <div className="flex flex-col justify-center items-center pt-2 pb-2">
                    <svg className="mb-3 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or drag and drop</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {heroFile != null && (
            <div className="md:flex md:items-start mb-6">
              <div className="md:w-1/3">
                <label className="block text-sm font-semi-bold md:text-right mb-1 md:mb-0 pr-4">
                  Logo Preview
                </label>
              </div>
              <div className="md:w-2/3 ">
                <div className="md:h-48 w-full">
                  <div className="flex overflow-hidden relative">
                    <img className="object-scale-down md:object-contain md:h-48 rounded-md cursor-pointer" src={URL.createObjectURL(heroFile)} onClick={onFileRemove} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="w-full text-right pb-10">
          <button
            disabled={!formReady || loading}
            className="w-full bg-violet-700 hover:bg-violet-800 active:bg-violet-900 disabled:bg-gray-600 disabled:text-gray-500 text-white font-normal text-base py-3 px-4 rounded-md"
            onClick={onSubmit}>
            {loading ? "Submitting, Please Wait..." : "Submit New Tool"}
          </button>
        </div>
      </div>
    </div >
  )
}

SubmissionForm.layout = MainLayout;

export default SubmissionForm