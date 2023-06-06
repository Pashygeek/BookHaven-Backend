puts "🌱 Seeding spices..."

# Create categories
categories = ["Fiction", "Science Fiction", "Romance", "Mystery", "Fantasy", "Horror"]

categories.each do |name|
    Category.create(name: name)
end

# Create Books
books_data = [
    {
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      description: 'A gripping novel about racial injustice in a small Southern town.',
      image_url: 'https://cdn.britannica.com/21/182021-050-666DB6B1/book-cover-To-Kill-a-Mockingbird-many-1961.jpg',
      category: 'Fiction'
    },
    {
      title: '1984',
      author: 'George Orwell',
      description: 'A dystopian novel set in a totalitarian society.',
      image_url: 'https://target.scene7.com/is/image/Target/GUEST_f0bc34a6-e4a2-4b71-b133-44fb400fed5b?wid=488&hei=488&fmt=pjpeg',
      category: 'Science Fiction'
    },
    {
            title: 'The Great Gatsby',
            author: 'F. Scott Fitzgerald',
            description: 'A tragic love story set in the roaring twenties.',
            image_url: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg',
            category: 'Fiction'
            },
            {
            title: 'Pride and Prejudice',
            author: 'Jane Austen',
            description: 'A classic romance novel about the social dynamics of 19th-century England.',
            image_url: 'https://www.gutenberg.org/files/1342/1342-h/images/cover.jpg',
            category: 'Romance'
            },
            {
            title: 'The Catcher in the Rye',
            author: 'J.D. Salinger',
            description: 'A coming-of-age novel that explores themes of alienation and rebellion.',
            image_url: 'https://i0.wp.com/www.raptisrarebooks.com/images/73470/the-catcher-in-the-rye-jd-salinger-first-edition.jpg?fit=1000%2C800&ssl=1',
            category: 'Fiction'
            },
            {
                title: 'Dracula',
                author: 'Bram Stoker',
                description: 'A classic horror novel about the vampire Count Dracula.',
                image_url: 'https://m.media-amazon.com/images/I/81q5xK4+dqS._AC_UF1000,1000_QL80_.jpg',
                category: 'Horror'
              },
              {
                title: 'Harry Potter and the Sorcerer\'s Stone',
                author: 'J.K. Rowling',
                description: 'The first book in the popular Harry Potter series, filled with magic and adventure.',
                image_url: 'https://m.media-amazon.com/images/I/81iqZ2HHD-L._AC_UF1000,1000_QL80_.jpg',
                category: 'Fantasy'
              },
              {
                title: 'The Girl with the Dragon Tattoo',
                author: 'Stieg Larsson',
                description: 'A gripping mystery novel featuring a hacker and a journalist uncovering dark secrets.',
                image_url: 'https://rishikaspeaks.files.wordpress.com/2017/03/3485045.jpg',
                category: 'Mystery'
              },
              {
                title: 'It',
                author: 'Stephen King',
                description: 'A chilling horror story about an evil entity terrorizing a small town.',
                image_url: 'https://ashokbookcentre.com/wp-content/uploads/2021/12/71qRSFwOhiL.jpg',
                category: 'Horror'
              },
              {
                title: 'The Hobbit',
                author: 'J.R.R. Tolkien',
                description: 'A beloved fantasy adventure set in the world of Middle-earth.',
                image_url: 'https://nuriakenya.com/wp-content/uploads/2023/02/The-Hobbit-nuriakenya.jpg',
                category: 'Fantasy'
              },
              {
                title: 'Gone Girl',
                author: 'Gillian Flynn',
                description: 'A psychological thriller about a husband and wife with dark secrets.',
                image_url: 'https://www.samanthakilford.com/wp-content/uploads/2015/03/gone-girl.jpg',
                category: 'Mystery'
              },
              {
                title: 'Experimental Film',
                author: 'Gemma Files',
                description: 'Struggling film critic Lois Cairns discovers a connection between a mysterious silent film and a vanished female filmmaker, embarking on a journey that blurs reality and fairy tales, with dire consequences for her and those she loves.',
                image_url: 'https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1626893045-512r55EfePL._SL500_.jpg?crop=1xw:1xh;center,top&resize=980:*',
                category: 'Horror'
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
