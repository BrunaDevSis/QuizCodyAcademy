$(document).ready(function () {
  $("#imagem-goblin").hide();
  $("#imagem-paladino").hide();
  $("#imagem-mestre").hide();
  $(".descricao").hide();
  $("#texto-descricao-goblin").hide();
  $("#texto-descricao-paladino").hide();
  $("#texto-descricao-mestre").hide();
})


$('#modal_final').on('hidden.bs.modal', function () {
  location.reload();
});

$("#btn-descricao-goblin").click(function () {
  $(".descricao").show();
  $("#texto-descricao-goblin").show();
  $("#btn-descricao-goblin").hide();
})

$("#btn-descricao-paladino").click(function () {
  $(".descricao").show();
  $("#texto-descricao-paladino").show();
  $("#btn-descricao-paladino").hide();
})

$("#btn-descricao-mestre").click(function () {
  $(".descricao").show();
  $("#texto-descricao-mestre").show();
  $("#btn-descricao-mestre").hide();
})

$("#btn-inicio").click(function () {
  window.location.href = '#voltar-inicio';
});

$("#btn-niveis").click(function () {
  window.location.href = '#voltar-niveis';
});

$("#btn-regras").click(function () {
  window.location.href = '#voltar-descritivo';
});

const questao = document.querySelector(".descritivo");
const texto_resposta = document.querySelector(".respostas");
const progresso_quiz = document.querySelector(".progresso");
const mensagem_final = document.querySelector(".final span");
const caixa_pergunta = document.querySelector(".caixa");
const caixa_mensagem_final = document.querySelector(".final");
const btnRestart = document.querySelector(".btn_restart");

import perguntas from "./questoes.js";

let questao_atual = 0;
let acertos = 0;
let porcentagem = 0;

btnRestart.onclick = () => {
  caixa_pergunta.style.display = "flex";
  caixa_mensagem_final.style.display = "none";

  questao_atual = 0;
  acertos = 0;
  porcentagem = 0

  document.querySelector(".barra-progresso").style.padding = "5px";
  document.querySelector(".sub-barra-progresso").style.padding = "0px";
  document.querySelector(".sub-barra-progresso").style.width = porcentagem + "%";
  carregarQuestao();
};

function proximaQuestao(e) {
  if (e.target.getAttribute("data-correct") === "true") {
    acertos++;
  }

  if (questao_atual < perguntas.length - 1) {
    questao_atual++;
    porcentagem += 8;
    document.querySelector(".sub-barra-progresso").style.width = porcentagem + "%";
    document.querySelector(".sub-barra-progresso").style.padding = "5px";
    document.querySelector(".barra-progresso").style.padding = "0px";

    carregarQuestao();
  } else {
    finalizarQuiz();
  }
}

function finalizarQuiz() {
  mensagem_final.innerHTML = `Você acertou ${acertos} de ${perguntas.length}!`;
  document.querySelector(".sub-barra-progresso").style.width = "100%";
  caixa_mensagem_final.style.display = "flex";
  $("#modal_final").modal("show");
  if (acertos <= 5) {
    $("#imagem-goblin").show();
    document.querySelector(".descricao").style.backgroundColor = "rgba(113, 175, 121, 0.9)";
  }
  if (acertos >= 6 && acertos <= 9) {
    $("#imagem-paladino").show();
    document.querySelector(".descricao").style.backgroundColor = "rgba(255, 117, 117, 0.9)";
  }
  if (acertos >= 10) {
    $("#imagem-mestre").show();
    document.querySelector(".descricao").style.backgroundColor = "rgba(220, 132, 255, 0.9)";
  }
}

function carregarQuestao() {
  progresso_quiz.innerHTML = `${questao_atual + 1}/${perguntas.length}`;
  const item = perguntas[questao_atual];
  texto_resposta.innerHTML = "";
  questao.innerHTML = item.descricao;

  item.respostas.forEach((listar) => {
    const div = document.createElement("div");

    div.innerHTML = `
    <button class="responder" id="btn-quiz" data-correct="${listar.correta}">
      ${listar.escolha}
    </button>
    `;

    texto_resposta.appendChild(div);
  });

  document.querySelectorAll(".responder").forEach((item) => {
    item.addEventListener("click", proximaQuestao);
  });
}

carregarQuestao();