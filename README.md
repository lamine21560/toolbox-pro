# ToolBox Pro

Site statique de 16 outils gratuits (HTML/CSS/JS, sans serveur), compatible GitHub Pages.

## Mise en ligne sur GitHub Pages
1. Créez un compte sur github.com puis un dépôt public nommé `toolbox-pro`.
2. Cliquez sur **Add file → Upload files**, glissez **tout le contenu** du dossier (index.html, css/, js/…), puis **Commit changes**.
3. Dépôt → **Settings → Pages** → Source : *Deploy from a branch* → branche `main`, dossier `/ (root)` → **Save**.
4. Après 1 à 2 minutes, le site est disponible sur `https://VOTRE-NOM.github.io/toolbox-pro/`.

## À personnaliser
- `js/app.js` (ligne 1) : votre email de contact et le nom du site.
- `sitemap.xml` et `robots.txt` : remplacez `VOTRE-NOM` par votre pseudo GitHub.
- **Publicités** : collez le code de votre régie dans la fonction `AD` de `js/app.js` (emplacements *haut*, *milieu*, *bas*). Adaptez aussi la page Confidentialité.
- Ajouter un outil : copiez un bloc dans le tableau `T` de `js/app.js`.

## Structure
`index.html` accueil · `outil.html?t=ID` outils · `guides.html` guides · pages légales · `css/style.css` · `js/app.js`

## SEO
Balises title/description, `sitemap.xml` et `robots.txt` inclus. Soumettez le sitemap dans Google Search Console.
