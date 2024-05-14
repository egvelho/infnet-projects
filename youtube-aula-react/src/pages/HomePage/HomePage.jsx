import styles from "./HomePage.module.css";
import tw from "tailwind-styled-components";
import { VideoThumbnail } from "../../components/VideoThumbnail";
import { Chip } from "../../components/Chip";
import { SearchBar } from "../../components/SearchBar";

const tags = ["Youtuber", "Divertido", "Carismático", "Inovador", "Inspirador"];

const videos = [
  {
    title: "Aventuras com Luccas Neto",
    channel: "Luccas Neto",
    avatar:
      "https://yt3.googleusercontent.com/ytc/AIdro_k5vz8msAlt_7QhOwNTeoa3xuAh_2XhXCYqo4pvxw=s176-c-k-c0x00ffffff-no-rj",
    thumbnail:
      "https://i.ytimg.com/vi/uw4-WZNaTs8/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDC8ml0z85ZH0d6mV5rMu2Zp6j72A",
    views: 1000000,
    createdAt: "2019-03-28",
  },
  {
    title: "Luccas Neto e a Fábrica de Diversão",
    channel: "Luccas Neto",
    avatar:
      "https://yt3.googleusercontent.com/ytc/AIdro_k5vz8msAlt_7QhOwNTeoa3xuAh_2XhXCYqo4pvxw=s176-c-k-c0x00ffffff-no-rj",
    thumbnail:
      "https://i.ytimg.com/vi/zJ_ItTAD3e4/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBi9-BsebJRRtyvWUPptyCzM5jhWQ",
    views: 1500000,
    createdAt: "2015-03-20",
  },
  {
    title: "Desafios Malucos com Luccas Neto",
    channel: "Luccas Neto",
    avatar:
      "https://yt3.googleusercontent.com/ytc/AIdro_k5vz8msAlt_7QhOwNTeoa3xuAh_2XhXCYqo4pvxw=s176-c-k-c0x00ffffff-no-rj",
    thumbnail:
      "https://i.ytimg.com/vi/uw4-WZNaTs8/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDC8ml0z85ZH0d6mV5rMu2Zp6j72A",
    views: 800000,
    createdAt: "2024-03-15",
  },
  {
    title: "Luccas Neto e os Brinquedos Mágicos",
    channel: "Luccas Neto",
    avatar:
      "https://yt3.googleusercontent.com/ytc/AIdro_k5vz8msAlt_7QhOwNTeoa3xuAh_2XhXCYqo4pvxw=s176-c-k-c0x00ffffff-no-rj",
    thumbnail:
      "https://i.ytimg.com/vi/zJ_ItTAD3e4/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBi9-BsebJRRtyvWUPptyCzM5jhWQ",
    views: 1200000,
    createdAt: "2024-03-10",
  },
  {
    title: "Luccas Neto e a Turma da Alegria",
    channel: "Luccas Neto",
    avatar:
      "https://yt3.googleusercontent.com/ytc/AIdro_k5vz8msAlt_7QhOwNTeoa3xuAh_2XhXCYqo4pvxw=s176-c-k-c0x00ffffff-no-rj",
    thumbnail:
      "https://i.ytimg.com/vi/uw4-WZNaTs8/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDC8ml0z85ZH0d6mV5rMu2Zp6j72A",
    views: 2000000,
    createdAt: "2024-03-05",
  },
];

export function HomePage() {
  return (
    <div className={styles["home-page"]}>
      <TagsList />
      <VideoThumbnailGrid />
    </div>
  );
}

const TagsListContainer = tw.div`
  flex
  gap-2
  p-2
  overflow-hidden
  border-b
  border-b-[#0000001f]
  dark:border-b-[#ffffff1f]
`;

function TagsList() {
  return (
    <TagsListContainer>
      {tags.map((tag, index) => (
        <Chip className="w-[96px] shrink-0" key={index}>
          {tag}
        </Chip>
      ))}
    </TagsListContainer>
  );
}

const VideoThumbnailGridContainer = tw.div`
  grid
  gap-8
  sm:p-2
  sm:gap-2
  sm:grid-cols-2
  lg:p-4
  lg:gap-4
  lg:grid-cols-3
`;

function VideoThumbnailGrid() {
  return (
    <VideoThumbnailGridContainer>
      {videos.concat(videos, videos).map((video, index) => (
        <VideoThumbnail key={index} {...video} />
      ))}
    </VideoThumbnailGridContainer>
  );
}
