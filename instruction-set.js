// Instruction Set Reference: http://devernay.free.fr/hacks/chip8/C8TECH10.HTM#3.1
const Instruction = {
  CLS: () => {
    chip8.display.fill(0);
  },
  RET: () => {
    throw Error("not implemented");
  },
  JP_addr: ({ addr }) => {
    chip8.registers.PC = addr;
  },
  CALL_addr: () => {
    throw Error("not implemented");
  },
  SE_Vx_byte: ({ byte, x }) => {
    if (chip8.registers.V[x] === byte) {
      chip8.registers.PC += 2;
    }
  },
  SNE_Vx_byte: () => {
    throw Error("not implemented");
  },
  SE_Vx_Vy: () => {
    throw Error("not implemented");
  },
  LD_Vx_byte: ({ byte, x }) => {
    chip8.registers.V[x] = byte;
  },
  ADD_Vx_byte: ({ byte, x }) => {
    chip8.registers.V[x] += byte;
  },
  LD_Vx_Vy: () => {
    throw Error("not implemented");
  },
  OR_Vx_Vy: () => {
    throw Error("not implemented");
  },
  AND_Vx_Vy: () => {
    throw Error("not implemented");
  },
  XOR_Vx_Vy: () => {
    throw Error("not implemented");
  },
  ADD_Vx_Vy: () => {
    throw Error("not implemented");
  },
  SUB_Vx_Vy: () => {
    throw Error("not implemented");
  },
  SHR_Vx: () => {
    throw Error("not implemented");
  },
  SUBN_Vx_Vy: () => {
    throw Error("not implemented");
  },
  SHL_Vx: () => {
    throw Error("not implemented");
  },
  SNE_Vx_Vy: () => {
    throw Error("not implemented");
  },
  LD_I_addr: ({ addr }) => {
    chip8.registers.I = addr;
  },
  JP_V0_addr: () => {
    throw Error("not implemented");
  },
  RND_Vx_byte: () => {
    throw Error("not implemented");
  },
  DRW_Vx_Vy_nibble: ({ nibble, x, y }) => {
    const sprite = chip8.memory.slice(
      chip8.registers.I,
      chip8.registers.I + nibble
    );
    sprite.forEach((row, yOffset) => {
      for (let xOffset = 0; xOffset < 8; xOffset++) {
        const pixel = (row >> (7 - xOffset)) & 1;
        const screenX = chip8.registers.V[x] + xOffset;
        const screenY = chip8.registers.V[y] + yOffset;
        const index = screenY * SCREEN_WIDTH + screenX;
        chip8.display[index] ^= pixel;
      }
    });
  },
  SKP_Vx: () => {
    throw Error("not implemented");
  },
  SKNP_Vx: () => {
    throw Error("not implemented");
  },
  LD_Vx_DT: () => {
    throw Error("not implemented");
  },
  LD_Vx_K: () => {
    throw Error("not implemented");
  },
  LD_DT_Vx: () => {
    throw Error("not implemented");
  },
  LD_ST_Vx: () => {
    throw Error("not implemented");
  },
  ADD_I_Vx: () => {
    throw Error("not implemented");
  },
  LD_F_Vx: () => {
    throw Error("not implemented");
  },
  LD_B_Vx: () => {
    throw Error("not implemented");
  },
  LD_I_Vx: () => {
    throw Error("not implemented");
  },
  LD_Vx_I: () => {
    throw Error("not implemented");
  },
};
