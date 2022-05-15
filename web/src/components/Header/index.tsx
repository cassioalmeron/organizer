import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header>
      <span>
        <Link to="/">Home</Link>
      </span>
      <span> | </span>
      <span>
        <Link to="/about">About</Link>
      </span>
    </header>
  );
}
