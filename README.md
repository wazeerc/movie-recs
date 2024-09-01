
# Movie Recs 🎥

### Pick 3 Movies, and Let Us Find Your Next Must-Watch!

###### 🚧 Note:  Development still in progress.

<br>

Built with:

[![React](https://img.shields.io/badge/react.js-000000?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/vite-000000?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-000000?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Magic UI](https://img.shields.io/badge/magicui-000000?style=for-the-badge&logo=magicui&logoColor=white)](https://magicui.design/)
[![Supabase](https://img.shields.io/badge/Supabase-000000?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![](https://img.shields.io/badge/firebase-000000?style=for-the-badge&logo=firebase&logoColor=white)](https://firebase.google.com/)

## Installation

```bash
  npm i
  npm run dev
```

## Setting Up Supabase

1. Go to [Supabase](https://supabase.com) and create an account.
2. Create a new project in the Supabase dashboard.
3. Once the project is created, go to the "Settings" tab and find your `API URL` and `Anon Key`.
4. Copy these values and create a `.env` file in the root of the cloned repository:
5. Create a table called `Movies` and import the `csv` file from `public/data/movies.csv` and set a PK.
6. Create a RLS policy in order to access the data - please follow these steps:
   + Open the Table Editor
   + Select the "Movies" table
   + Click "Add RLS Policy"
   + Click "Create policy" (refer to [ss](#ss) below)
   + Choose the "Select" template
   + Save policy


```
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```
    
## Contributing

Contributions are always welcome! 😃

1. Fork the Project
2. Create your Feature Branch `git checkout -b feature/AmazingFeature`
3. Commit your Changes `git commit -m 'Add some AmazingFeature'`
4. Push to the Branch `git push origin feature/AmazingFeature`
5. Open a Pull Request


## License

Distributed under the [MIT](https://choosealicense.com/licenses/mit/) License. See LICENSE for more information.


###### Readme created with [readme.so](https://github.com/octokatherine/readme.so)

---

###### RLS Policy settings
<img style="float: left;" id="ss" width="500px" src="https://github.com/user-attachments/assets/2aac28e9-b791-430d-92f4-4ff05800c125" alt="RLS Policy Settings">
