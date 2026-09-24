# Site Dr. Gabriel Santos

Projeto Next.js com React, TypeScript e Tailwind CSS.

## Rodar localmente no Windows

Requisitos: Node.js 24 e Corepack. A instalação foi validada com pnpm 12.3.4, definido no `package.json`.

Na pasta do projeto, instale as dependências:

```powershell
corepack.cmd pnpm install --frozen-lockfile
```

Inicie o servidor de desenvolvimento:

```powershell
npm.cmd run dev
```

Acesse http://localhost:3000. Para encerrar, pressione `Ctrl+C` no terminal do servidor.

Os comandos usam `.cmd` para funcionar no PowerShell mesmo quando a execução de scripts `.ps1` está desabilitada. Não é necessário configurar um arquivo `.env` para rodar o site.

## Compilar e executar em produção local

```powershell
npm.cmd run build
npm.cmd start
```

Encerre o servidor de desenvolvimento antes de iniciar o de produção na mesma porta. O build também verifica os tipos TypeScript.
