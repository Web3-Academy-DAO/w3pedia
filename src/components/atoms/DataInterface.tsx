interface TagData {
  id: number,
  name: string
};

interface BlockChainData {
  id: number,
  name: string,
  website?: string
}

interface CategoryData {
  id: number,
  name: string
}

export type { TagData, BlockChainData, CategoryData }