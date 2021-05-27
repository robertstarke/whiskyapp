import Link from "next/link";
import React, { Component } from "react";

type NavState = {
  showNav: boolean;
};

class Header extends Component<unknown, NavState> {
  constructor(props: unknown) {
    super(props);
    this.state = { showNav: false };

    // This binding is necessary to make `this` work in the callback
    this.toggleNav = this.toggleNav.bind(this);
  }

  toggleNav(): void {
    this.setState((state) => ({ showNav: !state.showNav }));
  }

  render(): JSX.Element {
    return (
      <header className="flex-none flex justify-between items-center bg-green-500 p-3 rounded-t-sm text-white">
        <h1 className="inline-block text-2xl">Whisky List</h1>
        <nav
          className={`absolute bg-green-500 sm:relative sm:opacity-100 transition-all duration-300 ${
            this.state.showNav ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="wa-btn wa-nav-btn wa-btn-dark-green ml-2">
            <Link href="/">Whiskies</Link>
          </div>
          <div className="wa-btn wa-nav-btn wa-btn-dark-green ml-2">
            <Link href="/">Distilleries</Link>
          </div>
          <div className="wa-btn wa-nav-btn wa-btn-dark-green ml-2">
            <Link href="/">Owners</Link>
          </div>
        </nav>
        {this.state.showNav ? (
          <svg
            className="w-8 h-8 fill-current text-white sm:hidden cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            onClick={this.toggleNav}
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
          </svg>
        ) : (
          <svg
            className="w-8 h-8 fill-current text-white sm:hidden cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            onClick={this.toggleNav}
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
          </svg>
        )}
      </header>
    );
  }
}

export default Header;
