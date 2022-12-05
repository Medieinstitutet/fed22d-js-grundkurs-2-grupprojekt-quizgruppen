# FED22D JS Grundkurs Projektmall
Mall för projektuppgiften i JavaScript Grundkurs för FED22D.

Mallen innehåller:
- Vite (för att komprimera och publicera optimerad kod)
- ESLint, Prettier och Stylelint för kodformatering
- TypeScript för typstöd
- Inställningar för Visual Studio Code

## Installation
Installera "dependencies" till projektet med följande kommando i terminalen:

- Med npm: `npm install`
- Med pnpm: `pnpm install`
- Med Yarn: `yarn install`

För att köra projektet, använd scriptet "dev" i `package.json`:

- Med npm: `npm run dev`
- Med pnpm: `pnpm run dev`
- Med Yarn: `yarn run dev`

## Såhär använder du mallen
- Du arbetar primärt i mappen `src`. Där finns JavaScript och stilmallar.
- På rotnivån i projektet hittar du `index.html`, som du kan använda såsom du använt `index.html` hittills i de olika projekten.
- I mappen `public` lägger du alla filer som t.ex. bilder, favicons, fonter, osv. som är s.k. "static assets". T.ex. sådant du behöver länka in från SCSS.

### Filer du inte behöver röra
- `src/vite-env.d.ts` - Används för att bidra med "code hinting" i editorn
- `.gitignore` - Vilka filer som inte ska vara med i versionshanteringen
- `tsconfig.json` - Används för att definiera hur TypeScript ska skrivas och tolkas
- `.npmrc` - Används för att installera ev. dependencies
- `stylelint.config.cjs` - Regler för hur SCSS ska skrivas.
- `.pretterrc.json` - Används för att tvinga JavaScript att skrivas på ett visst sätt. Ändra om du vill göra en egen konfiguration
- `.eslintrc.cjs` - Används för att tvinga JavaScript att skrivas på ett visst sätt. Ändra om du vill göra din egen konfiguration.
- Mappen `.github` innehåller en s.k. action/workflow för att publicera de ändringar som pushas till main, när repot är publikt

## Publicera ditt projekt
Detta projekt innehåller en automatisk workflow/action, som fungerar såhär:

1. Varje gång du pushar till branchen `main`, så triggas ett script som heter `Deploy changes`.
2. Detta script kör i princip kommandot `pnpm run build`. Den skapar en mapp som heter `dist`, som innehåller ditt optimerade/färdiga/publicerade projekt. Filerna i den mappen kopieras över till en ny branch, som heter `gh-pages`.

För att aktivera din sajt live behöver du:

1. Gå in i filen `vite.config.js` och ändra `base` så att den heter samma som ditt repo heter.
2. Gå in i inställningarna för ditt repo (Settings), gå till fliken "General" och längst ner på sidan i "Danger Zone" ändrar du repots "visibility" till public.
3. I samma "Settings"-flik på ditt repo, klicka på "Pages" i menyn till vänster.
4. I "Branch"-dropdownen väljer du `gh-pages`.
