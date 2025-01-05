    const form = document.getElementById('user-form');
    const cardContainer = document.getElementById('card-container');

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const usernameInput = document.getElementById('username').value;
      const usernames = usernameInput.split(',').map(u => u.trim());

      
      cardContainer.innerHTML = '';

      for (const username of usernames) {
        try {
          const response = await fetch(`https://www.codewars.com/api/v1/users/${username}`);
          if (!response.ok) {
            throw new Error(`Failed to fetch data for ${username}`);
          }
          const userData = await response.json();

          const card = document.createElement('div');
          card.className = 'card';

          const javascriptRank = userData.ranks.languages.javascript ? 
            `${userData.ranks.languages.javascript.name} (${userData.ranks.languages.javascript.score} points)` : 'N/A';

          card.innerHTML = `
            <h3>${userData.username}</h3>
            <p><span class="highlight">Name:</span> ${userData.name || 'N/A'}</p>
            <p><span class="highlight">Clan:</span> ${userData.clan || 'N/A'}</p>
            <p><span class="highlight">Languages:</span> ${Object.keys(userData.ranks.languages).join(', ') || 'N/A'}</p>
            <p><span class="highlight">Rank:</span> ${userData.ranks.overall.name} (${userData.ranks.overall.score} points)</p>
            <p><span class="highlight">JavaScript Rank:</span> ${javascriptRank}</p>
          `;

          cardContainer.appendChild(card);
        } catch (error) {
          const errorCard = document.createElement('div');
          errorCard.className = 'card';
          errorCard.innerHTML = `<p>Error fetching data for ${username}</p>`;
          cardContainer.appendChild(errorCard);
        }
      }
    });