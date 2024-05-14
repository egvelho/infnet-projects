import styled from "styled-components";
import { Avatar } from "@mui/material";
import millify from "millify";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/pt-br";

dayjs.extend(relativeTime);
dayjs.locale("pt-br");

export function VideoThumbnail({
  title,
  channel,
  avatar,
  thumbnail,
  views,
  createdAt,
}) {
  const viewsMillify = millify(views, {
    locales: "pt-BR",
  });

  const createdAtRelativeTime = dayjs(createdAt).fromNow();

  return (
    <ThumbnailContainer>
      <ThumbnailImage src={thumbnail} />
      <ThumbnailInnerBox>
        <Avatar src={avatar} sx={{ width: "32px", height: "32px" }} />
        <TextBox>
          <ThumbnailTitleLink href="https://google.com">
            {title}
          </ThumbnailTitleLink>
          <ThumbnailChannelLink href="https://facebook.com">
            {channel}
          </ThumbnailChannelLink>
          <ThumbnailInfo>
            {viewsMillify} de visualizações - {createdAtRelativeTime}
          </ThumbnailInfo>
        </TextBox>
      </ThumbnailInnerBox>
    </ThumbnailContainer>
  );
}

const ThumbnailContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ThumbnailInnerBox = styled.div`
  display: flex;
  gap: 8px;
  padding: 8px;
`;

const TextBox = styled.div`
  display: flex;
  gap: 4px;
  flex-direction: column;
`;

const ThumbnailImage = styled.img`
  width: 100%;

  @media (min-width: 640px) {
    & {
      border-radius: 12px;
    }
  }
`;

const ThumbnailTitleLink = styled.a`
  font-size: 0.9em;
  line-height: 1;
  font-weight: bold;
  margin-bottom: 4px;
`;

const ThumbnailChannelLink = styled.a`
  font-size: 0.8em;
  opacity: 0.8;
  line-height: 1;
`;

const ThumbnailInfo = styled.a`
  font-size: 0.8em;
  opacity: 0.8;
  line-height: 1;
`;
