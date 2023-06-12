puts "🌱 Seeding spices...."

# Create categories
categories = ["Fantasy", "Fiction", "Romance", "Mystery", "Horror"]

categories.each do |name|
    Category.create(name: name)
end

# Create Books
books_data = [
  {
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    description: 'To Kill a Mockingbird is a gripping novel about racial injustice in a small Southern town. Through the eyes of young Scout Finch, the story explores the deep-seated prejudice and moral complexity that exists in society. Harper Lee\'s masterpiece delves into themes of compassion, empathy, and the courage to stand up for what is right.',
    image_url: 'https://cdn.britannica.com/21/182021-050-666DB6B1/book-cover-To-Kill-a-Mockingbird-many-1961.jpg',
    category: 'Fiction'
  },
  {
    title: '1984',
    author: 'George Orwell',
    description: '1984 is a dystopian novel set in a totalitarian society where individualism is suppressed, and Big Brother exerts complete control. George Orwell\'s thought-provoking masterpiece depicts a grim future where surveillance, manipulation, and censorship are the norm. It serves as a stark warning about the dangers of unchecked government power and the erosion of personal freedoms.',
    image_url: 'https://target.scene7.com/is/image/Target/GUEST_f0bc34a6-e4a2-4b71-b133-44fb400fed5b?wid=488&hei=488&fmt=pjpeg',
    category: 'Fiction'
  },
  {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    description: 'The Great Gatsby is a tragic love story set in the roaring twenties. F. Scott Fitzgerald\'s novel captures the allure and decadence of the Jazz Age, while also exploring themes of social class, wealth, and the American Dream. Through the enigmatic Jay Gatsby and his pursuit of the elusive Daisy Buchanan, Fitzgerald paints a vivid picture of a society plagued by illusion, obsession, and ultimately, disillusionment.',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg',
    category: 'Fiction'
  },
  {
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    description: 'Pride and Prejudice is a classic romance novel about the social dynamics of 19th-century England. Jane Austen\'s witty and insightful portrayal of the Bennet sisters and their quest for love and happiness has captured the hearts of readers for generations. With its sharp social commentary and memorable characters, this novel remains a beloved masterpiece of English literature.',
    image_url: 'https://www.gutenberg.org/files/1342/1342-h/images/cover.jpg',
    category: 'Romance'
  },
  {
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    description: 'The Catcher in the Rye is a coming-of-age novel that explores themes of alienation and rebellion. J.D. Salinger\'s iconic protagonist, Holden Caulfield, takes readers on a journey through the disillusionment and angst of adolescence. With its raw and honest portrayal of teenage angst and societal hypocrisy, this novel continues to resonate with readers of all ages.',
    image_url: 'https://i0.wp.com/www.raptisrarebooks.com/images/73470/the-catcher-in-the-rye-jd-salinger-first-edition.jpg?fit=1000%2C800&ssl=1',
    category: 'Fiction'
  },
  {
    title: 'Dracula',
    author: 'Bram Stoker',
    description: 'Dracula is a classic horror novel about the vampire Count Dracula. Bram Stoker\'s gothic tale of terror has become synonymous with the vampire genre and has inspired countless adaptations in literature, film, and television. Immerse yourself in the chilling world of Dracula as Stoker weaves a tale of suspense, seduction, and the battle between good and evil.',
    image_url: 'https://m.media-amazon.com/images/I/81q5xK4+dqS._AC_UF1000,1000_QL80_.jpg',
    category: 'Horror'
  },
  {
    title: 'Harry Potter and the Sorcerer\'s Stone',
    author: 'J.K. Rowling',
    description: 'Harry Potter and the Sorcerer\'s Stone is the first book in the popular Harry Potter series, filled with magic and adventure. J.K. Rowling introduces readers to the magical world of Hogwarts School of Witchcraft and Wizardry, where Harry Potter discovers his true identity as a wizard and begins his journey to confront the dark wizard Lord Voldemort. Join Harry, Hermione, and Ron as they uncover secrets, face challenges, and forge lifelong friendships.',
    image_url: 'https://m.media-amazon.com/images/I/81iqZ2HHD-L._AC_UF1000,1000_QL80_.jpg',
    category: 'Fantasy'
  },
  {
    title: 'The Girl with the Dragon Tattoo',
    author: 'Stieg Larsson',
    description: 'The Girl with the Dragon Tattoo is a gripping mystery novel featuring a hacker and a journalist uncovering dark secrets. Stieg Larsson\'s intense and intricately plotted story follows Lisbeth Salander and Mikael Blomkvist as they delve into a complex web of corruption, conspiracy, and murder. With its unforgettable characters and relentless suspense, this novel will keep you on the edge of your seat.',
    image_url: 'https://rishikaspeaks.files.wordpress.com/2017/03/3485045.jpg',
    category: 'Mystery'
  },
  {
    title: 'It',
    author: 'Stephen King',
    description: 'It is a chilling horror story about an evil entity terrorizing a small town. Stephen King\'s epic novel intertwines the lives of a group of childhood friends, known as the Losers\' Club, as they confront their deepest fears and confront the ancient, shape-shifting being known as Pennywise the Dancing Clown. With its immersive storytelling and richly drawn characters, It has become a landmark work in the horror genre.',
    image_url: 'https://ashokbookcentre.com/wp-content/uploads/2021/12/71qRSFwOhiL.jpg',
    category: 'Horror'
  },
  {
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    description: 'The Hobbit is a beloved fantasy adventure set in the world of Middle-earth. J.R.R. Tolkien\'s enchanting tale follows Bilbo Baggins, a hobbit who embarks on a perilous journey alongside a group of dwarves to reclaim their homeland from the fearsome dragon Smaug. Filled with epic battles, mythical creatures, and the power of friendship, this book sets the stage for the epic Lord of the Rings trilogy.',
    image_url: 'https://nuriakenya.com/wp-content/uploads/2023/02/The-Hobbit-nuriakenya.jpg',
    category: 'Fantasy'
  },
  {
    title: 'Gone Girl',
    author: 'Gillian Flynn',
    description: 'Gone Girl is a psychological thriller about a husband and wife with dark secrets. Gillian Flynn\'s gripping novel explores the toxic dynamics of a troubled marriage and the lengths people will go to deceive and manipulate. With its unpredictable twists and turns, this book will keep you guessing until the very end.',
    image_url: 'https://www.samanthakilford.com/wp-content/uploads/2015/03/gone-girl.jpg',
    category: 'Mystery'
  },
  {
    title: 'Experimental Film',
    author: 'Gemma Files',
    description: 'Experimental Film is a haunting tale that blurs reality and fairy tales, with dire consequences for its characters. Gemma Files takes readers on a journey through the life of struggling film critic Lois Cairns, who discovers a connection between a mysterious silent film and a vanished female filmmaker. As Lois unravels the truth behind the film, she becomes entangled in a web of darkness and horror that threatens everything she holds dear.',
    image_url: 'https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1626893045-512r55EfePL._SL500_.jpg?crop=1xw:1xh;center,top&resize=980:*',
    category: 'Horror'
  },
  # Added books
  {
    title: 'Animal Farm',
    author: 'George Orwell',
    description: 'Animal Farm is a satirical allegorical novella that uses a group of farm animals to illustrate the rise of totalitarianism in society. George Orwell\'s classic explores themes of power, corruption, and the dangers of political manipulation.',
    image_url: 'https://treystone.files.wordpress.com/2022/02/3149348.jpg',
    category: 'Fiction'
},
{
    title: 'Brave New World',
    author: 'Aldous Huxley',
    description: 'Brave New World is a dystopian novel set in a futuristic society where individuals are engineered and controlled for a stable and conformist world. Aldous Huxley\'s thought-provoking work examines themes of technology, social conditioning, and the price of happiness.',
    image_url: 'https://m.media-amazon.com/images/I/81zE42gT3xL._AC_UF1000,1000_QL80_.jpg',
    category: 'Fiction'
},
{
    title: 'Twilight',
    author: 'Stephen Meyer',
    description: 'Vampires, Romance what is there not to love.If you loved the series you will love the book.',
    image_url: 'https://upload.wikimedia.org/wikipedia/en/1/1d/Twilightbook.jpg',
    category: 'Romance'
},
{
    title: 'The Da Vinci Code',
    author: 'Dan Brown',
    description: 'The Da Vinci Code is a thrilling mystery novel that combines art, history, and conspiracy theories. Dan Brown takes readers on a fast-paced adventure as symbologist Robert Langdon unravels a series of clues to solve a mysterious murder and uncover a secret that could shake the foundations of Christianity.',
    image_url: 'https://m.media-amazon.com/images/I/91Q5dCjc2KL._AC_UF1000,1000_QL80_.jpg',
    category: 'Mystery'
},
{
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    description: 'The Alchemist is a philosophical novel that follows the journey of a young Andalusian shepherd named Santiago as he seeks his personal legend. Paulo Coelho\'s inspiring story explores themes of destiny, self-discovery, and the pursuit of one\'s dreams.',
    image_url: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1654371463i/18144590.jpg',
    category: 'Fiction'
},
{
    title: 'Dune',
    author: 'Frank Herbert',
    description: 'Dune is a science fiction epic set in a distant future where interstellar travel, political intrigue, and desert planets collide. Frank Herbert\'s masterpiece delves into themes of power, ecology, and the complex relationships between humanity and its environment.',
    image_url: 'https://m.media-amazon.com/images/I/81ym3QUd3KL._AC_UF1000,1000_QL80_.jpg',
    category: 'Fiction'
},
{
    title: 'Crazy Rich Asians',
    author: 'Kevin Kwan',
    description: 'Crazy Rich Asians is a comedic romance novel that follows the extravagant lives and complex relationships of wealthy families in Singapore. Kevin Kwan offers a glimpse into the world of high society, cultural clashes, and the pursuit of love and acceptance.',
    image_url: 'https://m.media-amazon.com/images/I/71oxddZ03GL._AC_UF1000,1000_QL80_.jpg',
    category: 'Romance'
},
{
    title: 'The Chronicles of Narnia',
    author: 'C.S. Lewis',
    description: 'The Chronicles of Narnia is a series of fantasy novels that transport readers to the magical world of Narnia. C.S. Lewis weaves enchanting tales of adventure, friendship, and the battle between good and evil, captivating readers of all ages.',
    image_url: 'https://upload.wikimedia.org/wikipedia/en/c/cb/The_Chronicles_of_Narnia_box_set_cover.jpg',
    category: 'Fantasy'
},
{
    title: 'Divergent',
    author: 'Veronica Roth',
    description: 'Divergent is a young adult dystopian novel set in a future society divided into factions based on human virtues. Veronica Roth introduces readers to a world of identity, choice, and rebellion as protagonist Tris Prior challenges the strict social order and uncovers dangerous secrets.',
    image_url: 'https://upload.wikimedia.org/wikipedia/en/f/f4/Divergent_%28book%29_by_Veronica_Roth_US_Hardcover_2011.jpg',
    category: 'Romance'
}
]


    Book.transaction do
        books_data.each do |book_data|
            category = Category.find_by(name: book_data[:category])
            if category
            Book.create(
                title: book_data[:title],
                author: book_data[:author],
                description: book_data[:description],
                image_url: book_data[:image_url],
                category_id: category.id
            )
        else
            puts "Category '#{book_data[:category]}' not found for book '#{book_data[:title]}'."
        end
    end
end
   
puts "✅ Done seeding!"
