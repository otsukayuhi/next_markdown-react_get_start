export type ContentType = {
  default: string;
};

// Markdownファイルを取得
// 取得できなれば、nullを返す
const getContent = async (id: string) => {
  const content = await import(`../../data/markdown/${id}.md`).catch(
    () => null
  );
  return content;
};

export default getContent;
