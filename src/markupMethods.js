export default class MarkupMethods {
  makeList(responseArray) {
    const markup = responseArray
      .map(({ flags: { svg }, name } = country) => {
        return `<li>
        <img src="${svg}" alt="${name}" width="30px" height="20px"/>
        <p>${name}</p>
      </li>`;
      })
      .join(' ');
    return markup;
  }

  makeCard(responseArray) {
    const lang = responseArray[0].languages
      .map(language => {
        return `${language.name}`;
      })
      .join(', ');

    const markup = responseArray
      .map(({ flags: { svg }, name, capital, population } = country) => {
        return `
              <div class="card-header">
              <img src="${svg}" width="40px" height="30px">
              <p class="country_name">${name}</p>
              </div>
              <p>Capital: ${capital}</p>
              <p>Population: ${population}</p>
              <p>Languages: ${lang}</p>
              `;
      })
      .join('');

    return markup;
  }
}
