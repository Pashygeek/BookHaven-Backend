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
      image_url: 'https://example.com/to-kill-a-mockingbird.jpg',
      category: 'Fiction'
    },
    {
      title: '1984',
      author: 'George Orwell',
      description: 'A dystopian novel set in a totalitarian society.',
      image_url: 'https://example.com/1984.jpg',
      category: 'Science Fiction'
    },
    {
            title: 'The Great Gatsby',
            author: 'F. Scott Fitzgerald',
            description: 'A tragic love story set in the roaring twenties.',
            image_url: 'https://example.com/the-great-gatsby.jpg',
            category: 'Fiction'
            },
            {
            title: 'Pride and Prejudice',
            author: 'Jane Austen',
            description: 'A classic romance novel about the social dynamics of 19th-century England.',
            image_url: 'https://example.com/pride-and-prejudice.jpg',
            category: 'Romance'
            },
            {
            title: 'The Catcher in the Rye',
            author: 'J.D. Salinger',
            description: 'A coming-of-age novel that explores themes of alienation and rebellion.',
            image_url: 'https://example.com/the-catcher-in-the-rye.jpg',
            category: 'Fiction'
            },
            {
            title: 'To Kill a Mockingbird',
            author: 'Harper Lee',
            description: 'A gripping novel about racial injustice in a small Southern town.',
            image_url: 'https://example.com/to-kill-a-mockingbird.jpg',
            category: 'Fiction'
            },
            {
            title: '1984',
            author: 'George Orwell',
            description: 'A dystopian novel set in a totalitarian society.',
            image_url: 'https://example.com/1984.jpg',
            category: 'Science Fiction'
            },
            {
                title: 'Dracula',
                author: 'Bram Stoker',
                description: 'A classic horror novel about the vampire Count Dracula.',
                image_url: 'https://example.com/dracula.jpg',
                category: 'Horror'
              },
              {
                title: 'Harry Potter and the Sorcerer\'s Stone',
                author: 'J.K. Rowling',
                description: 'The first book in the popular Harry Potter series, filled with magic and adventure.',
                image_url: 'https://example.com/harry-potter.jpg',
                category: 'Fantasy'
              },
              {
                title: 'The Girl with the Dragon Tattoo',
                author: 'Stieg Larsson',
                description: 'A gripping mystery novel featuring a hacker and a journalist uncovering dark secrets.',
                image_url: 'https://example.com/girl-with-the-dragon-tattoo.jpg',
                category: 'Mystery'
              },
              {
                title: 'It',
                author: 'Stephen King',
                description: 'A chilling horror story about an evil entity terrorizing a small town.',
                image_url: 'https://example.com/it.jpg',
                category: 'Horror'
              },
              {
                title: 'The Hobbit',
                author: 'J.R.R. Tolkien',
                description: 'A beloved fantasy adventure set in the world of Middle-earth.',
                image_url: 'https://example.com/the-hobbit.jpg',
                category: 'Fantasy'
              },
              {
                title: 'Gone Girl',
                author: 'Gillian Flynn',
                description: 'A psychological thriller about a husband and wife with dark secrets.',
                image_url: 'https://example.com/gone-girl.jpg',
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
