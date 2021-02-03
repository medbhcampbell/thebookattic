drop table if exists reviews;
drop table if exists toread;
drop table if exists haveread;
drop table if exists books;
drop table if exists genres;
drop table if exists authors;

create table authors
(
	id serial primary key,
	userid varchar(25) not null,
	firstname varchar(25),
	lastname varchar(25),
	avgrating float not null,
	bio varchar(500) not null,
	picture varchar(100) not null
);

create table genres
(
	id serial primary key,
	name varchar(25) not null
);

create table books
(
	id serial primary key,
	authorid int not null,
	title varchar(50) not null,
	cover varchar(150) not null,
	blurb varchar(500) not null,
	page_count int not null,
	link varchar(50),
	rating float default 0,
	approved boolean default false,
	genreid int not null,
	constraint fk_authorid foreign key (authorid) references authors (id),
	constraint fk_genreid foreign key (genreid) references genres (id)
);

create table reviews
(
    id serial primary key,
    rating int not null,
    content text not null,
    username varchar(25) not null,
    bookid int not null references books(id) not null,
    approved boolean default false
);

create table toread
(
	username varchar(25) not null,
	bookid int not null,
	primary key(username, bookid),
	constraint fk_bookid foreign key (bookid) references books (id)
);

create table haveread
(
	username varchar(25) not null,
	bookid int not null,
	primary key(username, bookid),
	constraint fk_bookid foreign key (bookid) references books (id)
);

-- Populating with some sample entries, feel free to add/remove
insert into genres (name) values ('action');
insert into genres (name) values ('adventure');
insert into genres (name) values ('nonfiction');
insert into genres (name) values ('classic');
insert into genres (name) values ('fantasy');
insert into genres (name) values ('mystery');
insert into genres (name) values ('romance');
insert into genres (name) values ('sci-fi');
insert into genres (name) values ('young adult');
insert into genres (name) values ('horror');

insert into authors (userid, firstname, lastname, avgrating, bio, picture) values ('jausten', 'Jane', 'Austen', '4.5', 'English romance author for the gentry', 'https://www.history.com/.image/ar_16:9%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cg_faces:center%2Cq_auto:good%2Cw_768/MTU3OTIzNTc2MTE1NzAxMzk0/why-jane-austen-never-marrieds-featured-photo.jpg');
insert into authors (userid, firstname, lastname, avgrating, bio, picture) values ('wshakespeare', 'William', 'Shakespeare', '2.7', 'Some unpopular English scriptwriter', 'https://www.bl.uk/britishlibrary/~/media/bl/global/dl%20shakespeare/authors/shakespeare-people-page.jpg');
insert into authors (userid, firstname, lastname, avgrating, bio, picture) values ('ltolstoy', 'Leo', 'Tolstoy', '4.8', 'Russian author who writes sad, preachy stories', 'https://cdn.britannica.com/94/4694-050-CABE0BB0/Leo-Tolstoy.jpg');
insert into authors (userid, firstname, lastname, avgrating, bio, picture) values ('sking', 'Stephen', 'King', '4.5', 'Writes scary stuff', 'https://images.gr-assets.com/authors/1362814142p8/3389.jpg');
insert into authors (userid, firstname, lastname, avgrating, bio, picture) values ('rdahl', 'Roald', 'Dahl', '4.6', 'Likes traumatizing children', 'https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTQxNDAyNjQ0MzAzMzI1MDc0/roald_dahl_getty_images_tony_evansgetty_images_108874289_croppedjpg.jpg');
insert into authors (userid, firstname, lastname, avgrating, bio, picture) values ('ifleming', 'Ian', 'Fleming', '3.8', 'Likes his spy dramas shaken, not stirred', 'https://cdn.britannica.com/60/176960-050-6676378E/Ian-Fleming.jpg');
insert into authors (userid, firstname, lastname, avgrating, bio, picture) values ('jverne', 'Jules', 'Verne', '4.6', 'French travel writer', 'https://www.biography.com/.image/ar_4:3%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTE4MDAzNDEwNzEzNjc1Mjc4/jules-verne-9517579-1-402.jpg');
insert into authors (userid, firstname, lastname, avgrating, bio, picture) values ('csagan', 'Carl', 'Sagan', '4.6', 'The man who inspired billions and billions of physicists (approximately)', 'https://cdn.britannica.com/15/116415-004-27A911EE/Carl-Sagan.jpg');
insert into authors (userid, firstname, lastname, avgrating, bio, picture) values ('gmartin', 'George RR', 'Martin', '4.7', 'Likes traumatizing adults', 'https://media.vanityfair.com/photos/53235792932cac31720001be/master/w_2560%2Cc_limit/george-rr-martin.jpg');
insert into authors (userid, firstname, lastname, avgrating, bio, picture) values ('jtolkien', 'JRR', 'Tolkien', '4.9', 'Obsessed with jewellery and elves', 'https://cdn.britannica.com/65/66765-050-63A945A7/JRR-Tolkien.jpg');
insert into authors (userid, firstname, lastname, avgrating, bio, picture) values ('achristie', 'Agatha', 'Christie', '5.0', 'Undisputed queen of the whoddunnit', 'https://www.biography.com/.image/t_share/MTE5NDg0MDU0OTI0MDY4MzY3/agatha-christie-9247405-1-402.jpg');
insert into authors (userid, firstname, lastname, avgrating, bio, picture) values ('mshelley', 'Mary', 'Shelley', '5.0', 'Started a genre in a thunderstorm', 'https://collectionimages.npg.org.uk/large/mw05761/Mary-Shelley.jpg');
insert into authors (userid, firstname, lastname, avgrating, bio, picture) values ('dadams', 'Douglas', 'Adams', '4.6', 'A hoopy frood who knows where his towel is', 'https://m.media-amazon.com/images/M/MV5BZTRkZGY3NDAtY2E0Mi00YTJhLWJlYTItZDRlM2JkMGE0ZDc0XkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_.jpg');
insert into authors (userid, firstname, lastname, avgrating, bio, picture) values ('epoe', 'Edgar Allan', 'Poe', '4.9', 'The gothiest goth to ever goth', 'https://media.poetryfoundation.org/uploads/media/default/0001/21/bd5c888c4689e6cd3583bbe7575a1a2cad3487f6.jpeg');
insert into authors (userid, firstname, lastname, avgrating, bio, picture) values ('egaskell', 'Elizabeth', 'Gaskell', '4.6', 'Austens goth twin', 'https://media.newyorker.com/photos/5b84444cc6de535e18043960/1:1/w_1562,h_1562,c_limit/Rosefield-Elizabeth-Gaskell.jpg');

-- Populating some books
insert into books (authorid, title, cover, blurb, page_count, genreid) values
	((select id from authors where lastname like 'Austen'),
	'Pride and Prejudice',
	'https://images-na.ssl-images-amazon.com/images/I/91HqOO4DmRL.jpg',
	'Will-they-wont-they in petticoats',
	'350',
	(select id from genres where name like 'romance'));
insert into books (authorid, title, cover, blurb, page_count, genreid) values
	((select id from authors where lastname like 'Austen'),
	'Northanger Abbey',
	'https://images-na.ssl-images-amazon.com/images/I/817RHZL+9UL.jpg',
	'How reading too many novels can send delicate young women mildly insane',
	'190',
	(select id from genres where name like 'romance'));
insert into books (authorid, title, cover, blurb, page_count, genreid) values
	((select id from authors where lastname like 'Gaskell'),
	'North and South',
	'https://images-na.ssl-images-amazon.com/images/I/41JJbGrrsnL._SX323_BO1,204,203,200_.jpg',
	'Look how awful and exploitative 19th century Northern English cotton mills were! But the main characters got married so its a happy ending',
	'460',
	(select id from genres where name like 'romance'));
insert into books (authorid, title, cover, blurb, page_count, approved, genreid) values
	((select id from authors where lastname like 'Shakespeare'),
	'The Tempest',
	'https://productimages.worldofbooks.com/185326203X.jpg'
	'Shipwrecks, monsters, and the meaning of humanity',
	'500',
	true,
	(select id from genres where name like 'classic'));
insert into books (authorid, title, cover, blurb, page_count, approved, genreid) values
	((select id from authors where lastname like 'Shakespeare'),
	'Hamlet',
	'https://www.penguin.co.uk/content/dam/prh/books/417/41764/9780141396507.jpg',
	'The Lion King but with fewer lions',
	'500',
	true,
	(select id from genres where name like 'classic'));
insert into books (authorid, title, cover, blurb, page_count, approved, genreid) values
	((select id from authors where lastname like 'King'),
	'It',
	'https://images-na.ssl-images-amazon.com/images/I/71lZgzNE2kL.jpg',
	'The OG murderclown, and people fleeing their hometowns',
	'750',
	true,
	(select id from genres where name like 'horror'));
insert into books (authorid, title, cover, blurb, page_count, approved, genreid) values
	((select id from authors where lastname like 'King'),
	'Carrie',
	'https://horrornovelreviews.files.wordpress.com/2013/01/03-06carrie.jpg',
	'Being a teenage girl is brutal, but the telekinesis has its use',
	'100',
	true,
	(select id from genres where name like 'horror'));
insert into books (authorid, title, cover, blurb, page_count, approved, genreid) values
	((select id from authors where lastname like 'Tolstoy'),
	'War and Peace',
	'https://images.penguinrandomhouse.com/cover/9781400079988',
	'Everyone is going to die',
	'3000',
	true,
	(select id from genres where name like 'classic'));
insert into books (authorid, title, cover, blurb, page_count, approved, genreid) values
	((select id from authors where lastname like 'Dahl'),
	'Charlie and the Chocolate Factory',
	'http://prodimage.images-bn.com/pimages/9780142410318_p0_v4_s1200x630.jpg',
	'All childhood flaws are punishable by death',
	'78',
	true,
	(select id from genres where name like 'young adult'));
insert into books (authorid, title, cover, blurb, page_count, approved, genreid) values
	((select id from authors where lastname like 'Dahl'),
	'James and the Giant Peach',
	'https://images-na.ssl-images-amazon.com/images/I/81EIIn8uMuL.jpg',
	'The benefits of alternative, off-grid, plant-based housing',
	'120',
	true,
	(select id from genres where name like 'young adult'));
insert into books (authorid, title, cover, blurb, page_count, approved, genreid) values
	((select id from authors where lastname like 'Fleming'),
	'Casino Royale',
	'https://images-na.ssl-images-amazon.com/images/I/91JYY6nSK8L.jpg',
	'The book so good they filmed it twice',
	'460',
	true,
	(select id from genres where name like 'action'));
insert into books (authorid, title, cover, blurb, page_count, approved, genreid) values
	((select id from authors where lastname like 'Fleming'),
	'From Russia With Love',
	'https://images-na.ssl-images-amazon.com/images/I/41-FFJynJqL._SX322_BO1,204,203,200_.jpg',
	'Yesh, Mish Moneypenny, I am 007',
	'500',
	true,
	(select id from genres where name like 'action'));
insert into books (authorid, title, cover, blurb, page_count, approved, genreid) values
	((select id from authors where lastname like 'Verne'),
	'20000 Leagues Under the Sea',
	'https://images-na.ssl-images-amazon.com/images/I/71uzDFhbgQL.jpg',
	'Predicting the existence of submarines, and pointing out a lot of fish',
	'550',
	true,
	(select id from genres where name like 'adventure'));
insert into books (authorid, title, cover, blurb, page_count, approved, genreid) values
	((select id from authors where lastname like 'Verne'),
	'Journey to the Center of the Earth',
	'https://images-na.ssl-images-amazon.com/images/I/911A8d8aCYL.jpg',
	'Huh, its dark down here',
	'390',
	true,
	(select id from genres where name like 'adventure'));
insert into books (authorid, title, cover, blurb, page_count, approved, genreid) values
	((select id from authors where lastname like 'Sagan'),
	'Cosmos',
	'https://images-na.ssl-images-amazon.com/images/I/91w4Ci-KMqL.jpg',
	'The universe is pretty neat',
	'510',
	true,
	(select id from genres where name like 'nonfiction'));
insert into books (authorid, title, cover, blurb, page_count, approved, genreid) values
	((select id from authors where lastname like 'Martin'),
	'A Game of Thrones',
	'https://images-na.ssl-images-amazon.com/images/I/91dSMhdIzTL.jpg',
	'The captivating start to an epic fantasy which will be concluded any day now',
	'1500',
	true,
	(select id from genres where name like 'fantasy'));
insert into books (authorid, title, cover, blurb, page_count, approved, genreid) values
	((select id from authors where lastname like 'Martin'),
	'The Winds of Winter',
	'https://www.parnell.net.nz/wp-content/uploads/2016/11/parnell_watchthisspace_teaser.jpg',
	'The satisfying final chapter of A Song of Ice and Fire',
	'10000',
	true,
	(select id from genres where name like 'fantasy'));
insert into books (authorid, title, cover, blurb, page_count, approved, genreid) values
	((select id from authors where lastname like 'Tolkien'),
	'The Fellowship of the Ring',
	'https://images-na.ssl-images-amazon.com/images/I/91jBdaRVqML.jpg',
	'The grandfather of modern high fantasy',
	'750',
	true,
	(select id from genres where name like 'fantasy'));
insert into books (authorid, title, cover, blurb, page_count, approved, genreid) values
	((select id from authors where lastname like 'Tolkien'),
	'The Two Towers',
	'https://m.media-amazon.com/images/I/4123zOAwAgL.jpg',
	'Starts partway through a long journey. Ends... slightly further along in the same journey',
	'800',
	true,
	(select id from genres where name like 'fantasy'));
insert into books (authorid, title, cover, blurb, page_count, approved, genreid) values
	((select id from authors where lastname like 'Tolkien'),
	'The Return of the King',
	'https://m.media-amazon.com/images/I/41KGl2FqeAL.jpg',
	'See this, George RR Martin? THIS is how you finish an epic',
	'1200',
	true,
	(select id from genres where name like 'fantasy'));
insert into books (authorid, title, cover, blurb, page_count, approved, genreid) values
	((select id from authors where lastname like 'Christie'),
	'The Murder of Roger Ackroyd',
	'https://images-na.ssl-images-amazon.com/images/I/713gSnLgjbL.jpg',
	'Spoilers: Monsieur Poirot figures it out',
	'280',
	true,
	(select id from genres where name like 'mystery'));
insert into books (authorid, title, cover, blurb, page_count, approved, genreid) values
	((select id from authors where lastname like 'Christie'),
	'A Murder is Announced',
	'https://images-na.ssl-images-amazon.com/images/I/619YMl7zdhL.jpg',
	'Spoilers: Miss Marple figures it out',
	'500',
	true,
	(select id from genres where name like 'mystery'));
insert into books (authorid, title, cover, blurb, page_count, approved, genreid) values
	((select id from authors where lastname like 'Shelley'),
	'Frankenstein',
	'https://images-na.ssl-images-amazon.com/images/I/51r0PdZrI8L._SX316_BO1,204,203,200_.jpg',
	'Who is the true monster here?',
	'510',
	true,
	(select id from genres where name like 'sci-fi'));
insert into books (authorid, title, cover, blurb, page_count, approved, genreid) values
	((select id from authors where lastname like 'Adams'),
	'A Hitchhikers Guide to the Galaxy',
	'https://images-na.ssl-images-amazon.com/images/I/81XSN3hA5gL.jpg',
	'Where spaceships hang in the air in the exact way that bricks do not',
	'300',
	true,
	(select id from genres where name like 'sci-fi'));
insert into books (authorid, title, cover, blurb, page_count, approved, genreid) values
	((select id from authors where lastname like 'Poe'),
	'The Fall of the House of Usher',
	'https://images3.penguinrandomhouse.com/cover/9780451530318',
	'Take care of your family estate, lest it fall into disrepair',
	'50',
	true,
	(select id from genres where name like 'horror'));

insert into toread (username, bookid) values ('jausten', 3);
insert into toread (username, bookid) values ('jausten', 4);
insert into toread (username, bookid) values ('wshakespeare', 3);
insert into toread (username, bookid) values ('wshakespeare', 10);
insert into toread (username, bookid) values ('mshelley', 7);
insert into toread (username, bookid) values ('mshelley', 25);

insert into haveread (username, bookid) values ('gmartin', 18);
insert into haveread (username, bookid) values ('gmartin', 19);
insert into haveread (username, bookid) values ('gmartin', 20);
insert into haveread (username, bookid) values ('gmartin', 4);
insert into haveread (username, bookid) values ('gmartin', 5);
insert into haveread (username, bookid) values ('mshelley', 24);
insert into haveread (username, bookid) values ('mshelley', 23);
insert into haveread (username, bookid) values ('wshakespeare', 4);
