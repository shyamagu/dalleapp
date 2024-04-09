<!-- DallePanel.svelte -->
<script>
    let displayFieldVisible = false;
    let displayLoading = false;

    export let endpoint = "";
    export let apiKey = "";

    let message = "";
 
    const gen_number = 4;

    /**
     * @type {any[]}
     */
    let images = [];

    async function callDalle(){

      const send = {
        endpoint: endpoint,
        apiKey: apiKey,
        message: message
      }

      const response = await fetch("/api/getimage", {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(send)
        });

      const data = await response.json()

      return data
    }

    async function postRequest() {
      // Placeholder for the actual post request logic
      displayFieldVisible = true;
      displayLoading = true;


      const promises = Array.from({length: gen_number}, () => getImage());

      // Run all getImage calls in parallel
      await Promise.all(promises);

      displayLoading = false;
    }

    async function getImage() {
      const reulst = await callDalle();
      const imagedata = {
        url: reulst.url,
        prompt: reulst.prompt
      }
      images = [...images, imagedata];
    }


  </script>
    
  <div class="container">
    <div class="input-field">
      <textarea class="textarea" bind:value={message}></textarea>
      <button class="button" on:click={postRequest} disabled={displayLoading}>Generate</button>
    </div>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="display-field {displayFieldVisible ? 'visible' : ''}">
      {#each images as image, i}
        <div class="image-div">
          <a href={image.url} target="_blank">
            <img src={image.url} alt={image.prompt} />
          </a>
        </div>
      {/each}
      {#if displayLoading}
      <div class="loader"></div>
      {/if}
    </div>
  </div>

  <style>
    .container {
      padding: 50px;
      font-family: Arial, sans-serif;
    }
  
    .input-field {
      margin-bottom: 50px;
    }
  
    .textarea {
      width: calc(100% - 20px);
      height: 150px;
      margin-bottom: 10px;
      border-radius: 10px;
      border-color: #ccc;
      padding:10px;
      font-family: 'Noto Sans JP', sans-serif;
    }
  
    .button {
      font-size: 1.1em;
      display: block;
      width: 150px;
      margin-left: auto;
      padding: 10px;
      background-color: #08f;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-family: 'Noto Sans JP', sans-serif;
    }
  
    .button:hover {
    /* ホバー時のスタイル */
      background-color: #0cf; /* Darker blue */
    }

    .button:disabled {
      /* 非活性時のスタイル */
      background-color: #cccccc; /* Gray */
      color: #666666;
      cursor: not-allowed;
    }

    .display-field {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 50px;
      visibility: hidden;
    }
  
    .display-field.visible {
      visibility: visible;
    }
  
    .image-div {
      border: 1px solid #007bff;
      width: 420px;
      height: 420px;
      cursor: pointer;
    }

    .image-div img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .loader {
      border: 16px solid #f3f3f3; /* Light grey */
      border-top: 16px solid #3498db; /* Blue */
      border-radius: 50%;
      width: 90px;
      height: 90px;
      animation: spin 2s linear infinite;
      margin:150px;
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  </style>
