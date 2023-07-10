/*
Tem que ter @
nome antes do @
domínio depois do @
meuemail@localhost
*/

const formContato = document.querySelector("#form-contato");

const formNome = document.querySelector("#form-nome");
const formNomeErrorMessage = document.querySelector("#form-nome-error-message");

const formEmail = document.querySelector("#form-email");
const formEmailErrorMessage = document.querySelector(
  "#form-email-error-message"
);

const formMensagem = document.querySelector("#form-mensagem");
const formMensagemErrorMessage = document.querySelector(
  "#form-mensagem-error-message"
);

formNome.oninput = (event) => {
  const nome = event.target.value;
  const nomeValid = isNomeValid(nome);
};

formEmail.oninput = (event) => {
  const email = event.target.value;
  const emailValid = isEmailValid(email);
};

formMensagem.oninput = (event) => {
  const mensagem = event.target.value;
  const mensagemValid = isMensagemValid(mensagem);
};

formContato.onsubmit = async (event) => {
  event.preventDefault();

  const nome = formNome.value;
  const email = formEmail.value;
  const mensagem = formMensagem.value;

  const nomeValid = isNomeValid(nome);
  const emailValid = isEmailValid(email);
  const mensagemValid = isMensagemValid(mensagem);

  if (nomeValid && emailValid && mensagemValid) {
    const formData = new FormData(event.target);
    try {
      const response = await fetch(
        "https://getform.io/f/d1dbb99e-0b2b-4ae4-9341-7b2afa5c660e",
        {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        }
      );
      const responseJson = await response.json();
      if (responseJson.success === true) {
        formNome.value = "";
        formEmail.value = "";
        formMensagem.value = "";
        alert("Formulário enviado com sucesso!");
      } else {
        alert("Houve um erro ao enviar o seu formulário. :(");
      }
    } catch (error) {
      console.log(error);
      alert("Sua conexão está instável. Por favor, tente novamente.");
    }
  }
};

function isInitialsUpperCase(name) {
  return (
    name.split(" ").filter((n) => {
      if (n[0] === undefined) {
        return false;
      }
      return n[0].toUpperCase() !== n[0];
    }).length === 0
  );
}

function isNomeValid(nome) {
  if (nome.length === 0) {
    formNome.classList.add("field-error");
    formNomeErrorMessage.textContent = "O campo nome não pode ficar vazio.";
    return false;
  } else if (nome.length < 2) {
    formNome.classList.add("field-error");
    formNomeErrorMessage.textContent =
      "O nome precisa ter pelo menos 2 caracteres.";
    return false;
  } else if (nome.length > 32) {
    formNome.classList.add("field-error");
    formNomeErrorMessage.textContent =
      "O nome precisa ter no máximo 32 caracteres.";
    return false;
  } else if (!isInitialsUpperCase(nome)) {
    formNome.classList.add("field-error");
    formNomeErrorMessage.textContent =
      "As iniciais do nome precisam ser maiúsculas.";
    return false;
  } else if (nome.match(/^[a-záàâãéèêíïóôõöúçñ ]+$/i) === null) {
    formNome.classList.add("field-error");
    formNomeErrorMessage.textContent = "O nome só pode ter letras e espaços.";
    return false;
  }

  formNome.classList.remove("field-error");
  formNomeErrorMessage.textContent = "";
  return true;
}

function isEmailValid(email) {
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const emailMatch = email.match(emailRegex);

  if (emailMatch === null) {
    formEmail.classList.add("field-error");
    formEmailErrorMessage.textContent = "O email digitado é inválido.";
    return false;
  } else {
    formEmail.classList.remove("field-error");
    formEmailErrorMessage.textContent = "";
    return true;
  }
}

function isMensagemValid(mensagem) {
  if (mensagem.length === 0) {
    formMensagem.classList.add("field-error");
    formMensagemErrorMessage.textContent =
      "O campo mensagem não pode ficar vazio.";
    return false;
  } else if (mensagem.length < 16) {
    formMensagem.classList.add("field-error");
    formMensagemErrorMessage.textContent =
      "A mensagem precisa ter pelo menos 16 caracteres.";
    return false;
  } else if (mensagem.length > 256) {
    formMensagem.classList.add("field-error");
    formMensagemErrorMessage.textContent =
      "A mensagem precisa ter no máximo 256 caracteres.";
    return false;
  }

  formMensagem.classList.remove("field-error");
  formMensagemErrorMessage.textContent = "";
  return true;
}
