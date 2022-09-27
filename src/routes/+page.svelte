<script lang="ts">
  import titleBg from '$lib/assets/google-font-box-title-bg.png';
	import TextSearchInput from './TextSearchInput.svelte';
  import Loader from '$lib/components/Loader.svelte'
  import initGoogleFontsHelper from '$lib/scripts/googleFontsHelpers';
	import HorizFieldset from '$lib/components/HorizFieldset.svelte';
	import Label from '$lib/components/Label.svelte';
  let initDone = false;
  let initError = false;
  initGoogleFontsHelper().then((gotFonts) => {
    initDone = true;
    initError = !gotFonts;
  });

  let primaryFontName = "Helvetica", primaryFontUrl = "", primaryFontColor = "#000000",
    secondaryFontName = "Helvetica", secondaryFontUrl = "", secondaryFontColor = "#000000",
    backgroundColor = "#FFFFFF"
  const setPrimaryFontInfo = (fontName: string, fontUrl: string) => {
    primaryFontName = fontName
    primaryFontUrl = fontUrl
  }
  const setSecondaryFontInfo = (fontName: string, fontUrl: string) => {
    secondaryFontName = fontName
    secondaryFontUrl = fontUrl
  }
</script>

<link rel="stylesheet" href={primaryFontUrl} type="text/css">
<link rel="stylesheet" href={secondaryFontUrl} type="text/css">

<header class="title-header">
  <h1 class="title">Google Font Box</h1>
  <p class="subtitle">A simple tool for browsing Google Fonts</p>
</header>

<main style="background-color: {backgroundColor}">
  <section class="section is-small tint-background has-text-light" aria-label="App controls">
    <form action="" aria-label="Font and color pickers">
      <Loader loaded={initDone}>
        <div class="is-flex is-align-items-flex-end">
          <HorizFieldset ariaLabel="Primary font controls">
            <legend>Primary</legend>
            <TextSearchInput
              name="primary-font"
              label="Font"
              setFont={(fontName, fontUrl) => setPrimaryFontInfo(fontName, fontUrl)}
            />
            <div>
              <Label forName="primary-color" innerText="Color" />
              <input
                class="input color-input"
                type="color"
                name="primary-color"
                id="primary-color"
                bind:value={primaryFontColor}
              >
            </div>
          </HorizFieldset>
          <HorizFieldset ariaLabel="Secondary font controls">
            <legend>Secondary</legend>
            <TextSearchInput 
              name="secondary-font" 
              label="Font" 
              setFont={(fontName, fontUrl) => setSecondaryFontInfo(fontName, fontUrl)} 
            />
            <div>
              <Label forName="secondary-color" innerText="Color" />
              <input
                class="input color-input"
                type="color"
                name="secondary-color"
                id="secondary-color"
                bind:value={secondaryFontColor}
              >
            </div>
          </HorizFieldset>
          <div>
            <Label forName="bg-color" innerText="Background" />
            <input
              class="input color-input"
              type="color"
              name="bg-color"
              id="bg-color"
              bind:value={backgroundColor}
            >
          </div>
        </div>
      </Loader>
    </form>
  </section>
  <section class="section" aria-label="Font and color display">
    <div class="is-flex is-flex-direction-column is-align-items-center font-display-container">
      <span 
        class="primary-font-display center-text" 
        aria-label="Primary font display"
        style="
          font-family: {primaryFontName};
          color: {primaryFontColor};  
        "
      >
        The Quick Brown Fox Jumps Over the Lazy Dog
      </span>
      <span 
        class="secondary-font-display center-text" 
        aria-label="Secondary font display"
        style="
          font-family: {secondaryFontName};
          color: {secondaryFontColor};
        "
      >
        The quick brown fox jumps over the lazy dog
      </span>
    </div>
  </section>
</main>

<footer>

</footer>