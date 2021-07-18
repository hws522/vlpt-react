import qs from 'qs';

export default function About({ location }) {
  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  const detail = query.detail === 'true';

  return (
    <div>
      <h1>ABOUT</h1>
      <div>Test About</div>
      {detail && <p>추가 정보 ... ... ...</p>}
    </div>
  );
}
