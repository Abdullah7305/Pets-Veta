import { Link, NavLink } from 'react-router-dom';

import styles from './Navbar.module.css';
import { NAV_ITEMS } from './navbar.data';

const Navbar = () => {
  return (
    <header
      className={`
        ${styles.navbar}
        fixed
        left-0
        top-0
        z-50
        w-full
      `}
    >
      <div
        className='
          mx-auto
          flex
          max-w-7xl
          items-center
          justify-between
          px-6
          py-5
        '
      >
        {/* Logo */}
        <Link
          to='/'
          className={`
            ${styles.logo}
            text-3xl
            font-bold
            text-[var(--text-dark)]
          `}
        >
          PetVeta
        </Link>

        {/* Navigation */}
        <nav>
          <ul className='flex items-center gap-10'>
            {NAV_ITEMS.map((item) => {
              const isAuthButton =
                item.label === 'Login/Register';

              return (
                <li key={item.id}>
                  {isAuthButton ? (
                    <NavLink
                      to={item.path}
                      className={`
                        ${styles.authButton}
                        rounded-full
                        bg-[var(--blue)]
                        px-6
                        py-3
                        text-sm
                        font-semibold
                        text-white
                        shadow-lg
                        hover:bg-[var(--blue-hover)]
                      `}
                    >
                      {item.label}
                    </NavLink>
                  ) : (
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        `
                          ${styles.navLink}
                          text-sm
                          font-medium
                          transition-all
                          duration-300
                          ${isActive
                          ? 'text-[var(--blue)]'
                          : 'text-[var(--text-dark)]'
                        }
                        `
                      }
                    >
                      {item.label}
                    </NavLink>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;