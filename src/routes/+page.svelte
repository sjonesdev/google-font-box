<script lang="ts">
  import titleBg from '$lib/assets/google-font-box-title-bg.png';
	import FontTextSearchInput from './FontTextSearchInput.svelte';
  import Loader from '$lib/components/Loader.svelte'
  import initGoogleFontsHelper, { getFontWeightFromVariant } from '$lib/scripts/googleFontsHelpers';
	import HorizFieldset from '$lib/components/HorizFieldset.svelte';
	import Label from '$lib/components/Label.svelte';

  import type {FontDisplaySpec} from '$lib/scripts/googleFontsHelpers';

  let initDone = false;
  let initError = false;
  initGoogleFontsHelper().then((gotFonts) => {
    initDone = true;
    initError = !gotFonts;
  });

  const DEFAULT_FONT_DISPLAY_SPEC: FontDisplaySpec = {
    name: "Helvetica",
    variant: "regular",
    url: ""
  }

  let primaryFont = DEFAULT_FONT_DISPLAY_SPEC, primaryFontColor = "#000000",
    secondaryFont = DEFAULT_FONT_DISPLAY_SPEC, secondaryFontColor = "#000000",
    backgroundColor = "#FFFFFF"
  const setPrimaryFontInfo = (fontInfo: FontDisplaySpec) => {
    primaryFont = fontInfo
  }
  const setSecondaryFontInfo = (fontInfo: FontDisplaySpec) => {
    secondaryFont = fontInfo
  }

  function getStyle(fontInfo: FontDisplaySpec, color: string) {
    return `
      font-family: ${fontInfo.name};
      font-weight: ${getFontWeightFromVariant(fontInfo.variant)};
      font-style: ${fontInfo.variant.includes('italic') ? 'italic' : 'normal'};
      color: ${color};
    `;
  }

</script>

<link rel="stylesheet" href={primaryFont.url} type="text/css">
<link rel="stylesheet" href={secondaryFont.url} type="text/css">

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
            <FontTextSearchInput
              name="primary-font"
              label="Font"
              initialSelected={primaryFont.name}
              setFont={(fontInfo) => setPrimaryFontInfo(fontInfo)}
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
            <FontTextSearchInput 
              name="secondary-font" 
              label="Font" 
              initialSelected={secondaryFont.name}
              setFont={(fontInfo) => setSecondaryFontInfo(fontInfo)} 
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
          <div style="margin-bottom: calc(0.5rem + 2px);"> <!-- Margin-bottom for element inside horizfielset + fieldset border width -->
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
        style={getStyle(primaryFont, primaryFontColor)}
      >
        The Quick Brown Fox Jumps Over the Lazy Dog
      </span>
      <span 
        class="secondary-font-display center-text" 
        aria-label="Secondary font display"
        style={getStyle(secondaryFont, secondaryFontColor)}
      >
        The quick brown fox jumps over the lazy dog
      </span>
    </div>
  </section>
</main>

<footer>

</footer>