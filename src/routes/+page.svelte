<script lang="ts">
  import titleBg from '$lib/assets/google-font-box-title-bg.png';
	import TextSearchInput from './TextSearchInput.svelte';
  import Loader from '$lib/components/Loader.svelte'
  import initGoogleFontsHelper from '$lib/scripts/googleFontsHelpers';
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
  <section class="" aria-label="App controls">
    <form action="" aria-label="Font and color pickers">
      <Loader loaded={initDone}>
        <div class="is-flex is-align-items-flex-end">
          <TextSearchInput 
            name="primary-font" 
            label="Primary Font" 
            setFont={(fontName, fontUrl) => setPrimaryFontInfo(fontName, fontUrl)} 
          />
          <TextSearchInput 
            name="secondary-font" 
            label="Secondary Font" 
            setFont={(fontName, fontUrl) => setSecondaryFontInfo(fontName, fontUrl)} 
          />
          <input 
            class="input color-input" 
            type="color" 
            name="primary-color" 
            id="primary-color"
            bind:value={primaryFontColor}
          >
          <input 
            class="input color-input" 
            type="color" 
            name="secondary-color" 
            id="secondary-color"
            bind:value={secondaryFontColor}
          >
          <input 
            class="input color-input" 
            type="color" 
            name="bg-color" 
            id="bg-color"
            bind:value={backgroundColor}
          >
        </div>
      </Loader>
    </form>
  </section>
  <section aria-label="Font and color display">
    <div class="font-display-container">
      <span 
        class="primary-font-display" 
        aria-label="Primary font display"
        style="
          font-family: {primaryFontName};
          color: {primaryFontColor};  
        "
      >
        The Quick Brown Fox Jumps Over the Lazy Dog
      </span>
      <span 
        class="secondary-font-display" 
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