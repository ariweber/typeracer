import { Link, NavLink } from "react-router";

const navLinkClassName = ({ isActive }: { isActive: boolean }) =>
  isActive ? "header-link active" : "header-link";

export default function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <Link className="header-logo" to="/">TypeRacer</Link>
        <nav className="header-nav">
          <NavLink className={navLinkClassName} to="/" end>
            משחק
          </NavLink>
          <NavLink className={navLinkClassName} to="/sets">
            עריכת סט משפטים
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
