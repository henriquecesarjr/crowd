function status(request, response) {
  response.status(200).json({ chave: "Tudo certo, chefe!" });
}

export default status;
