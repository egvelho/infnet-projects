import tw from "tailwind-styled-components";

export const Button = tw.button`
    bg-purple-600
    [&:not(:disabled)]:hover:opacity-75
    text-slate-100
    font-bold
    rounded-md
    py-2
    px-4
`;
