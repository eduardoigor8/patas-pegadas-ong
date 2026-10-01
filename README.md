# Patas & Pegadas

Site demonstrativo de uma ONG de proteção animal, desenvolvido com HTML, CSS e JavaScript nativos. O projeto apresenta as páginas institucionais, uma galeria filtrável de animais e um formulário de interesse em adoção.

## Estrutura do projeto

```text
Atividade 2/
├── README.md
├── css/
│   └── style.css
├── html/
│   ├── index.html
│   ├── sobre.html
│   ├── animais.html
│   ├── adocao.html
│   └── resgate.html
├── images/
│   ├── imagem-01.jpg
│   ├── ...
│   └── imagem-09.jpg
└── js/
    ├── main.js
    ├── navigation.js
    ├── spa-router.js
    ├── adoption-form.js
    ├── animal-gallery.js
    ├── animal-filters.js
    └── animal-filter-storage.js
```

- `html/` contém as cinco páginas. Todas carregam `../js/main.js` como módulo ES6.
- `css/style.css` reúne os estilos compartilhados e as regras responsivas.
- `images/` contém as imagens JPEG locais, com nomes genéricos sequenciais.
- `js/` contém o ponto de entrada e os módulos organizados por responsabilidade.

## Arquitetura JavaScript

O projeto não utiliza frameworks, bibliotecas externas ou CDN. Os módulos usam APIs nativas do navegador e se comunicam por imports/exports ES6 e contratos explícitos do DOM. O Vite é usado como servidor de desenvolvimento e bundler de produção; não adiciona dependências ao código executado no navegador.

- `main.js` importa os módulos e coordena a inicialização. Sua função `initializePageContent()` prepara os recursos específicos de cada página e é executada novamente após uma navegação SPA.
- `navigation.js` controla o menu responsivo, os estados de acessibilidade, o fechamento por clique externo e a tecla Escape.
- `spa-router.js` intercepta links HTML internos, carrega a página com `fetch`, interpreta o documento com `DOMParser`, substitui o elemento `<main>` e atualiza a History API. Recebe `initializePageContent` como callback para evitar dependência direta dos módulos de cada página.
- `adoption-form.js` valida o formulário, injeta mensagens junto aos campos, aplica estados visuais e apresenta a confirmação local. Não envia dados para um servidor.
- `animal-gallery.js` guarda os dados dos animais e clona o elemento `<template>` de `animais.html` para montar os cards.
- `animal-filters.js` conecta os botões e campos de busca, aplica os critérios à galeria e solicita a persistência dos filtros.
- `animal-filter-storage.js` isola o acesso ao `localStorage`, convertendo o objeto de filtros entre JSON e JavaScript.

## Funcionalidades

### Navegação SPA

Links para páginas `.html` do próprio diretório são carregados sem recarregar o documento inteiro. O `<main>` é substituído, o título é atualizado e a navegação é registrada com `history.pushState()`. O evento `popstate` trata os comandos Voltar e Avançar. Links externos, downloads e cliques com teclas modificadoras mantêm o comportamento normal do navegador. Se uma página não puder ser carregada como SPA, o roteador tenta a navegação convencional.

### Galeria e filtros

Os seis animais são definidos como registros em `animal-gallery.js` e renderizados a partir do template HTML5. A galeria pode ser filtrada por tipo, idade, porte, cidade, filtros rápidos e busca por nome ou raça.

### Persistência local

Os filtros são salvos na chave `patas-pegadas:animal-filters:v1`. O estado inclui filtro rápido, tipo, idade, porte, cidade e texto de busca. A aplicação usa `JSON.stringify()` para gravar e `JSON.parse()` para restaurar as preferências quando a galeria é inicializada. O acesso é protegido contra JSON inválido ou armazenamento indisponível. Dados do formulário de adoção não são persistidos.

### Formulário de adoção

Nome, e-mail, preferência de animal e aceite de contato são obrigatórios. O e-mail é verificado quanto ao formato; telefone é opcional, mas validado se preenchido. As mensagens são apresentadas junto aos campos, com atributos de acessibilidade e estados visuais de válido/inválido. O envio é validado somente no navegador e apresenta uma confirmação local; não há integração com backend.

### Aparência e contraste

O seletor **Tema** oferece `Sistema`, `Claro` e `Escuro`; em `Sistema`, a aplicação acompanha `prefers-color-scheme`. O seletor **Contraste** oferece `Sistema`, `Padrão` e `Alto`, respeitando `prefers-contrast: more` quando está em `Sistema`. Ambas as preferências são persistidas separadamente dos filtros pela chave `patas-pegadas:appearance:v1`. A folha de estilos também inclui suporte a `forced-colors` para as configurações de alto contraste do sistema operacional.

## Desenvolvimento e build

É necessário ter Node.js e npm instalados. A partir da pasta `Atividade 2`, execute:

```sh
npm install
npm run dev
```

O Vite abre `html/index.html` num servidor local. Para gerar a versão de produção, execute `npm run build`; os ficheiros compilados e minificados são gravados em `dist/`. As cinco páginas HTML são entradas da build, mantendo a estrutura de URLs usada pela navegação SPA. Para testar a build localmente, execute `npm run preview`.

## Deploy na Netlify

A plataforma eleita é a **Netlify**. O projeto é um site estático e não precisa de servidor de aplicação em produção: o Vite gera HTML, CSS, JavaScript e imagens em `dist/`, que a Netlify pode servir diretamente por CDN e HTTPS. A ligação a um repositório Git permite builds automáticas a cada atualização e previews de alterações. O `package-lock.json` fixa as versões das dependências usadas na build.

O ficheiro `netlify.toml` define `npm run build` como comando de build, `dist/` como diretório publicado e redireciona `/` para `/html/index.html`, preservando o caminho esperado pela navegação existente.

Para publicar, envie a pasta `Atividade 2` para um repositório GitHub, importe esse repositório na Netlify e selecione a branch principal. Confirme que a base de publicação é a pasta do projeto (onde está `netlify.toml`) e que as definições de build apontam para `dist/`; depois, publique o deploy inicial. As atualizações futuras serão publicadas a partir de novos commits.

## Compatibilidade e limitações

É necessário um navegador moderno com suporte a módulos ES6, `fetch`, `DOMParser`, History API e `localStorage`. O estado persistido pertence à origem atual (protocolo, domínio e porta), portanto não é compartilhado entre origens diferentes. O projeto é um protótipo exclusivamente front-end: os dados do formulário não são enviados nem armazenados em um serviço remoto.
