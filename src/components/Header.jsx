import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <>
      <Link to="/accounts">
        <button> Account </button>
      </Link>

      <Link to="/trades">
        <button> Trades </button>
      </Link>

      <Link to="/ratios">
        <button> Ratios </button>
      </Link>
    </>
  );
};
