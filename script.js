
const form = document.getElementById("satisfacaoForm");
const formulario = document.getElementById("formulario");
const agradecimento = document.getElementById("agradecimento");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const respostas = {};
  let todasRespondidas = true;

  for (let i = 1; i <= 11; i++) {
    const resposta = document.querySelector(`input[name="q${i}"]:checked`);
    if (resposta) {
      respostas[`q${i}`] = parseInt(resposta.value);
    } else {
      todasRespondidas = false;
      break;
    }
  }

  if (!todasRespondidas) {
    alert("Por favor, responda todas as perguntas.");
    return;
  }

  const { error } = await supabase
    .from('feedback_evento')
    .insert([{ respostas }]);

  if (!error) {
    formulario.classList.add("hidden");
    agradecimento.classList.add("active");
  } else {
    alert("Erro ao enviar dados.");
    console.error(error);
  }
});

function reiniciarFormulario() {
  form.reset();
  agradecimento.classList.remove("active");
  formulario.classList.remove("hidden");
}
