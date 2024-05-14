import tw from "tailwind-styled-components";
import { Link } from "react-router-dom";

/** @type {typeof Link} */
export const LinkButton = tw(Link)`
    bg-purple-600
    hover:bg-purple-800
    text-slate-100
    font-bold
    rounded-md
    py-2
    px-4
`;
