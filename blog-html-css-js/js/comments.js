const comments = [
  {
    createdAt: "5 horas atrás",
    title: "A certificação de metodologias",
    message:
      "A certificação de metodologias que nos auxiliam a lidar com a execução dos pontos do programa afeta positivamente a correta previsão das novas proposições.",
    avatar: "https://loremflickr.com/96/96?cache=1",
    username: "@wasp",
  },
  {
    createdAt: "6 horas atrás",
    title: "O cuidado em identificar",
    message:
      "O cuidado em identificar pontos críticos na revolução dos costumes causa impacto indireto na reavaliação do orçamento setorial.",
    avatar: "https://loremflickr.com/96/96?cache=2",
    username: "@ruffs",
  },
  {
    createdAt: "Há uma semana",
    title: "No mundo atual",
    message:
      "No mundo atual, o acompanhamento das preferências de consumo obstaculiza a apreciação da importância dos métodos utilizados na avaliação de resultados.",
    avatar: "https://loremflickr.com/96/96?cache=3",
    username: "@turkey",
  },
  {
    createdAt: "Há duas semanas",
    title: "A certificação de metodologias",
    message:
      "A certificação de metodologias que nos auxiliam a lidar com a consolidação das estruturas representa uma abertura para a melhoria do sistema de participação geral.",
    avatar: "https://loremflickr.com/96/96?cache=4",
    username: "@snail",
  },
  {
    createdAt: "Há muito tempo",
    title: "O que temos que ter sempre",
    message:
      "O que temos que ter sempre em mente é que o fenômeno da Internet oferece uma interessante oportunidade para verificação dos modos de operação convencionais.",
    avatar: "https://loremflickr.com/96/96?cache=5",
    username: "@penguin",
  },
];

let commentsList = document.querySelector("#comments-list");

comments.forEach((commentData) => {
  const commentItem = getCommentItem(
    commentData.avatar,
    commentData.username,
    commentData.createdAt,
    commentData.title,
    commentData.message
  );

  commentsList.appendChild(commentItem);
});

function getCommentItem(avatar, username, createdAt, title, message) {
  let commentsListItem = document.createElement("article");
  commentsListItem.className = "comments-list-item";

  let commentsListItemInfo = document.createElement("div");
  commentsListItemInfo.className = "comments-list-item-info";

  let commentsListItemInfoContent = document.createElement("div");
  commentsListItemInfoContent.className = "comments-list-item-info-content";

  let commentsListItemAvatar = document.createElement("img");
  commentsListItemAvatar.className = "comments-list-item-avatar";
  commentsListItemAvatar.src = avatar;

  let commentsListItemUsername = document.createElement("span");
  commentsListItemUsername.className = "comments-list-item-username";
  commentsListItemUsername.innerHTML = username;

  let commentsListItemCreatedAt = document.createElement("span");
  commentsListItemCreatedAt.className = "comments-list-item-created-at";
  commentsListItemCreatedAt.innerHTML = createdAt;

  let commentsListItemTitle = document.createElement("h2");
  commentsListItemTitle.className = "comments-list-item-title";
  commentsListItemTitle.innerHTML = title;

  let commentsListItemMessage = document.createElement("p");
  commentsListItemMessage.className = "comments-list-item-message";
  commentsListItemMessage.innerHTML = message;

  commentsListItemInfo.appendChild(commentsListItemAvatar);
  commentsListItemInfoContent.appendChild(commentsListItemUsername);
  commentsListItemInfoContent.appendChild(commentsListItemCreatedAt);
  commentsListItemInfo.appendChild(commentsListItemInfoContent);

  commentsListItem.appendChild(commentsListItemInfo);
  commentsListItem.appendChild(commentsListItemTitle);
  commentsListItem.appendChild(commentsListItemMessage);

  return commentsListItem;
}
