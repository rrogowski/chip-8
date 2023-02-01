const chip8 = new Chip8();

const executeAnimationFrame = () => {
  if (!chip8.isHalted) {
    chip8.emulateCpuCycle();
  }
  requestAnimationFrame(executeAnimationFrame);
};

requestAnimationFrame(executeAnimationFrame);
