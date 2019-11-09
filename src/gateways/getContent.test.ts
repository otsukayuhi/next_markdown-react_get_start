import getContent from './getContent';

// TODO: テストの書き方がわからん
describe('gateways/getContent', () => {
  it('取得するコンテンツがなかったとき、nullを返す', async () => {
    const content = await getContent('noFileName');
    await expect(content).toBeNull();
  });
  it('コンテンツを取得したとき、コンテンツを文字列として返す', async () => {
    const content = await getContent('fileName');
    // TODO 間違いテスト
    await expect(content).toBeNull();
  });
});
