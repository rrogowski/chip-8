// Chip-8 Technical Reference: https://devernay.free.fr/hacks/chip8/C8TECH10.HTM

const GENERAL_PURPOSE_REGISTER_COUNT = 16;
const STACK_ADDRESS_COUNT = 16;
const PROGRAM_LOAD_ADDRESS = 0x0200;
const MEMORY_SIZE_IN_BYTES = 0x1000;
const SCREEN_HEIGHT = 32;
const SCREEN_WIDTH = 64;

class Chip8 {
  constructor() {
    this.display = new Uint8Array(SCREEN_HEIGHT * SCREEN_WIDTH);
    this.isHalted = true;
    this.memory = new Uint8Array(MEMORY_SIZE_IN_BYTES);
    this.registers = {
      I: 0,
      PC: 0,
      V: new Uint8Array(GENERAL_PURPOSE_REGISTER_COUNT),
    };
  }

  startEmulation(rom) {
    rom.forEach((byte, i) => {
      this.memory[PROGRAM_LOAD_ADDRESS + i] = byte;
    });
    this.registers.PC = PROGRAM_LOAD_ADDRESS;
    this.isHalted = false;
  }

  emulateCpuCycle() {
    const opcode =
      (this.memory[this.registers.PC] << 8) |
      this.memory[this.registers.PC + 1];
    const instruction = decodeInstruction(opcode);
    const variables = decodeVariables(opcode);
    this.registers.PC += 2;
    instruction(variables);
    drawToCanvas(this.display);
  }
}

const decodeInstruction = (opcode) => {
  switch (opcode) {
    case 0x00e0:
      return Instruction.CLS;
    case 0x00ee:
      return Instruction.RET;
  }
  switch (opcode & 0xf000) {
    case 0x1000:
      return Instruction.JP_addr;
    case 0x2000:
      return Instruction.CALL_addr;
    case 0x3000:
      return Instruction.SE_Vx_byte;
    case 0x4000:
      return Instruction.SNE_Vx_byte;
    case 0x5000:
      return Instruction.SE_Vx_Vy;
    case 0x6000:
      return Instruction.LD_Vx_byte;
    case 0x7000:
      return Instruction.ADD_Vx_byte;
    case 0x9000:
      return Instruction.SNE_Vx_Vy;
    case 0xa000:
      return Instruction.LD_I_addr;
    case 0xb000:
      return Instruction.JP_V0_addr;
    case 0xc000:
      return Instruction.RND_Vx_byte;
    case 0xd000:
      return Instruction.DRW_Vx_Vy_nibble;
  }
  switch (opcode & 0xf00f) {
    case 0x8000:
      return Instruction.LD_Vx_Vy;
    case 0x8001:
      return Instruction.OR_Vx_Vy;
    case 0x8002:
      return Instruction.AND_Vx_Vy;
    case 0x8003:
      return Instruction.XOR_Vx_Vy;
    case 0x8004:
      return Instruction.ADD_Vx_Vy;
    case 0x8005:
      return Instruction.SUB_Vx_Vy;
    case 0x8006:
      return Instruction.SHR_Vx;
    case 0x8007:
      return Instruction.SUBN_Vx_Vy;
    case 0x800e:
      return Instruction.SHL_Vx;
  }
  switch (opcode & 0xf0ff) {
    case 0xe09e:
      return Instruction.SKP_Vx;
    case 0xe0a1:
      return Instruction.SKNP_Vx;
    case 0xf007:
      return Instruction.LD_Vx_DT;
    case 0xf00a:
      return Instruction.LD_Vx_K;
    case 0xf015:
      return Instruction.LD_DT_Vx;
    case 0xf018:
      return Instruction.LD_ST_Vx;
    case 0xf01e:
      return Instruction.ADD_I_Vx;
    case 0xf029:
      return Instruction.LD_F_Vx;
    case 0xf033:
      return Instruction.LD_B_Vx;
    case 0xf055:
      return Instruction.LD_I_Vx;
    case 0xf065:
      return Instruction.LD_Vx_I;
  }

  throw Error(`invalid opcode: ${opcode.toString(16)}`);
};

const decodeVariables = (opcode) => {
  const addr = opcode & 0x0fff;
  const byte = opcode & 0x00ff;
  const nibble = opcode & 0x000f;
  const x = (opcode & 0x0f00) >> 8;
  const y = (opcode & 0x00f0) >> 4;
  return { addr, byte, nibble, x, y };
};

const PixelColor = {
  ALPHA_OFF: 0xff,
  ALPHA_ON: 0xff,
  BLUE_OFF: 0xff,
  BLUE_ON: 0x00,
  GREEN_OFF: 0xff,
  GREEN_ON: 0x00,
  RED_OFF: 0xff,
  RED_ON: 0x00,
};

const drawToCanvas = (display) => {
  const canvas = document.getElementById("display");
  const context = canvas.getContext("2d");
  const image = context.createImageData(SCREEN_WIDTH, SCREEN_HEIGHT);
  display.forEach((pixel, i) => {
    const imageIndex = i * 4;
    image.data[imageIndex] =
      pixel === 1 ? PixelColor.RED_ON : PixelColor.RED_OFF;
    image.data[imageIndex + 1] =
      pixel === 1 ? PixelColor.GREEN_ON : PixelColor.GREEN_OFF;
    image.data[imageIndex + 2] =
      pixel === 1 ? PixelColor.BLUE_ON : PixelColor.BLUE_OFF;
    image.data[imageIndex + 3] =
      pixel === 1 ? PixelColor.ALPHA_ON : PixelColor.ALPHA_OFF;
  });
  context.putImageData(image, 0, 0);
};
