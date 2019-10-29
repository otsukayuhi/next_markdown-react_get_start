// Markdownファイルを取得
// 取得できなれば、nullを返す
export const getContent = async id => {
  const content = await import(`../../data/markdown/${id}.md`).catch(() => null)
  return content
}
