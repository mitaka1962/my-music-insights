export default function Page() {  
  return (
    <main>
      <div className="chat chat-end gap-y-4">
        <div className="chat-bubble animate-[fade-in-up-20_0.8s_ease_both_0s]">
          お気に入りの楽曲やアルバムを<br/>
          検索してみましょう！
        </div>
        <div className="chat-bubble animate-[fade-in-up-20_0.8s_ease_both_0.2s]">
          アーティスト名、アルバム名を使った絞り込み検索も可能です<br/>
          （日本語名で出ない場合は英語名を試してみてください）
        </div>
        <div className="chat-bubble animate-[fade-in-up-20_0.8s_ease_both_0.4s]">
          楽曲検索やデータの取得には、<br/>
          <a className="link link-info" href="https://developer.spotify.com/documentation/web-api" target="_blank">Spotify Web API</a>を使用しています
        </div>
      </div>
    </main>    
  );
}
