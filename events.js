const onFileChange = async (event) => {
  if (!event.target.files) {
    return;
  }

  const file = event.target.files[0];
  const rom = await readFile(file);
  chip8.startEmulation(rom);
};

const readFile = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(new Uint8Array(reader.result));
    };
    reader.readAsArrayBuffer(file);
  });
};
