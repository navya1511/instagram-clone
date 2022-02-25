/* eslint-disable no-plusplus */
// NOTE: replace 'NvPY9M9MzFTARQ6M816YAzDJxZ72' with your Firebase auth user id (can be taken from Firebase)
export function seedDatabase(firebase) {
    const users = [
      {
        userId: '4J3ZciOeUBaPS2AacUF3VYJA9QN2',
        username: 'navya',
        fullName: 'Navya Arora',
        emailAddress: 'navyaarora@gmail.com',
        following: ['2'],
        followers: ['2', '3', '4'],
        dateCreated: Date.now()
      },
      {
        userId: '2',
        username: 'mohsin',
        fullName: 'Mohsin khan',
        emailAddress: 'mohsinkhan@gmail.com',
        following: [],
        followers: ['4J3ZciOeUBaPS2AacUF3VYJA9QN2'],
        dateCreated: Date.now()
      },
      {
        userId: '3',
        username: 'dali',
        fullName: 'Salvador Dalí',
        emailAddress: 'salvadordali@gmail.com',
        following: [],
        followers: ['4J3ZciOeUBaPS2AacUF3VYJA9QN2'],
        dateCreated: Date.now()
      },
      {
        userId: '4',
        username: 'sidharth',
        fullName: 'Sidharth Malhotra',
        emailAddress: 'sidmalhotra@gmail.com',
        following: [],
        followers: ['4J3ZciOeUBaPS2AacUF3VYJA9QN2'],
        dateCreated: Date.now()
      }
    ];
  
    // eslint-disable-next-line prefer-const
    for (let k = 0; k < users.length; k++) {
      firebase.firestore().collection('users').add(users[k]);
    }
  
    // eslint-disable-next-line prefer-const
    for (let i = 1; i <= 5; ++i) {
      firebase
        .firestore()
        .collection('photos')
        .add({
          photoId: i,
          userId: '2',
          imageSrc: `/images/users/mohsin/${i}.jpg`,
          caption: 'Hey , This is Mohsin Khan',
          likes: [],
          comments: [
            {
              displayName: 'dali',
              comment: 'Love this background!'
            },
            {
              displayName: 'sidharth',
              comment: 'Hey bro! Whats up?'
            }
          ],
          userLatitude: '40.7128°',
          userLongitude: '74.0060°',
          dateCreated: Date.now()
        });
    }
  }