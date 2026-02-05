#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

console.log("🔍 检查UniApp开发环境...\n");

// 检查Node.js版本
try {
  const nodeVersion = process.version;
  console.log(`✅ Node.js版本: ${nodeVersion}`);
} catch (error) {
  console.log("❌ 无法获取Node.js版本");
}

// 检查npm版本
try {
  const npmVersion = execSync("npm --version", { encoding: "utf8" }).trim();
  console.log(`✅ npm版本: ${npmVersion}`);
} catch (error) {
  console.log("❌ 无法获取npm版本");
}

// 检查项目依赖
const packageJsonPath = path.join(__dirname, "package.json");
if (fs.existsSync(packageJsonPath)) {
  console.log("✅ package.json存在");

  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
  console.log(`✅ 项目名称: ${packageJson.name}`);
  console.log(`✅ Vue版本: ${packageJson.dependencies?.vue || "未找到"}`);
  console.log(
    `✅ UniApp版本: ${packageJson.dependencies?.["@dcloudio/uni-app"] || "未找到"}`,
  );
} else {
  console.log("❌ package.json不存在");
}

// 检查node_modules
const nodeModulesPath = path.join(__dirname, "node_modules");
if (fs.existsSync(nodeModulesPath)) {
  console.log("✅ node_modules目录存在");

  // 检查关键依赖
  const checkDeps = ["vue", "@dcloudio/uni-app", "@dcloudio/vite-plugin-uni"];
  checkDeps.forEach((dep) => {
    const depPath = path.join(nodeModulesPath, dep);
    if (fs.existsSync(depPath)) {
      console.log(`✅ ${dep} 已安装`);
    } else {
      console.log(`❌ ${dep} 未安装`);
    }
  });
} else {
  console.log("❌ node_modules目录不存在，请运行 npm install");
}

// 检查VSCode配置
const vscodeDir = path.join(__dirname, ".vscode");
if (fs.existsSync(vscodeDir)) {
  console.log("✅ .vscode目录存在");

  const settingsPath = path.join(vscodeDir, "settings.json");
  const extensionsPath = path.join(vscodeDir, "extensions.json");

  if (fs.existsSync(settingsPath)) {
    console.log("✅ settings.json存在");
  } else {
    console.log("⚠️  settings.json不存在");
  }

  if (fs.existsSync(extensionsPath)) {
    console.log("✅ extensions.json存在");
  } else {
    console.log("⚠️  extensions.json不存在");
  }
} else {
  console.log("⚠️  .vscode目录不存在，建议创建VSCode配置");
}

// 检查TypeScript配置
const tsconfigPath = path.join(__dirname, "tsconfig.json");
if (fs.existsSync(tsconfigPath)) {
  console.log("✅ tsconfig.json存在");
} else {
  console.log("❌ tsconfig.json不存在");
}

// 检查Vite配置
const viteConfigPath = path.join(__dirname, "vite.config.ts");
if (fs.existsSync(viteConfigPath)) {
  console.log("✅ vite.config.ts存在");
} else {
  console.log("❌ vite.config.ts不存在");
}

// 检查UniApp配置文件
const uniConfigs = ["src/manifest.json", "src/pages.json", "src/App.vue"];
uniConfigs.forEach((config) => {
  const configPath = path.join(__dirname, config);
  if (fs.existsSync(configPath)) {
    console.log(`✅ ${config} 存在`);
  } else {
    console.log(`❌ ${config} 不存在`);
  }
});

console.log("\n📋 环境检查完成！");
console.log("\n🚀 启动开发服务器命令: npm run dev:h5");
console.log("🌐 开发服务器地址: http://localhost:5173/");
console.log("\n💡 建议:");
console.log("1. 安装VSCode推荐扩展");
console.log("2. 运行 npm run dev:h5 启动开发服务器");
console.log("3. 访问 http://localhost:5173/ 查看应用");
