import {DefaultBodyType, delay, http, HttpResponse, PathParams} from 'msw'

export const handlers = [
  http.post<
    PathParams<never>,
    {
      name: string;
    },
    DefaultBodyType
  >('https://example.com/user', async ({ request }) => {
    await delay(1000)
    const { name } = await request.json()
    const users = [
      'Cristiano Ronaldo',
      'Cristina',
      'Cristiano',
      'Ronaldo',
      'Lionel Messi',
      'Neymar Jr',
      'Kylian Mbappé',
      'Mohamed Salah',
      'Sadio Mané',
      'Kevin De Bruyne',
      'Virgil van Dijk',
      'Sergio Ramos',
      'Robert Lewandowski',
      'Harry Kane',
      'Alisson Becker',
      'Thibaut Courtois',
      'Joshua Kimmich',
      'Manuel Neuer',
      'Karim Benzema',
      'Casemiro'
    ]

    const filteredUsers = users.filter((user) => user.toLowerCase().includes(name))

    return HttpResponse.json(filteredUsers)
  }),
]
