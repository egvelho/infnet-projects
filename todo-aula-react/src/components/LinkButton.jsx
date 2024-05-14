import tw from "tailwind-styled-components";
import { Link } from "react-router-dom";

/** @type {typeof Link} */
export const LinkButton = tw(Link)`
    bg-purple-600
    [&:not(:disabled)]:hover:opacity-75
    text-slate-100
    font-bold
    rounded-md
    py-2
    px-4
    inline-block
`;
