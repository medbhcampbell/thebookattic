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

insert into authors (userid, firstname, lastname, avgrating, bio, picture) values ('jausten', 'Jane', 'Austen', '4.5', 'English romance author for the gentry', 'url');
insert into authors (userid, firstname, lastname, avgrating, bio, picture) values ('wshakespeare', 'William', 'Shakespeare', '2.7', 'Some unpopular English scriptwriter', 'url');
insert into authors (userid, firstname, lastname, avgrating, bio, picture) values ('ltolstoy', 'Leo', 'Tolstoy', '4.8', 'Russian author who writes sad, preachy stories', 'url');
insert into authors (userid, firstname, lastname, avgrating, bio, picture) values ('sking', 'Stephen', 'King', '4.5', 'Writes scary stuff', 'url');
insert into authors (userid, firstname, lastname, avgrating, bio, picture) values ('rdahl', 'Roald', 'Dahl', '4.6', 'Likes traumatizing children', 'url');
insert into authors (userid, firstname, lastname, avgrating, bio, picture) values ('ifleming', 'Ian', 'Fleming', '3.8', 'Likes his spy dramas shaken, not stirred', 'url');
insert into authors (userid, firstname, lastname, avgrating, bio, picture) values ('jverne', 'Jules', 'Verne', '4.6', 'French travel writer', 'url');
insert into authors (userid, firstname, lastname, avgrating, bio, picture) values ('csagan', 'Carl', 'Sagan', '4.6', 'The man who inspired billions and billions of physicists (probably)', 'url');
insert into authors (userid, firstname, lastname, avgrating, bio, picture) values ('gmartin', 'George RR', 'Martin', '4.7', 'Likes traumatizing adults', 'url');
insert into authors (userid, firstname, lastname, avgrating, bio, picture) values ('jtolkien', 'JRR', 'Tolkien', '4.9', 'Obsessed with jewellery and elves', 'url');
insert into authors (userid, firstname, lastname, avgrating, bio, picture) values ('achristie', 'Agatha', 'Christie', '5.0', 'Undisputed queen of the whoddunnit', 'url');
insert into authors (userid, firstname, lastname, avgrating, bio, picture) values ('mshelley', 'Mary', 'Shelley', '5.0', 'Started a genre in a thunderstorm', 'url');
insert into authors (userid, firstname, lastname, avgrating, bio, picture) values ('dadams', 'Douglas', 'Adams', '4.6', 'A hoopy frood who knows where his towel is', 'url');
insert into authors (userid, firstname, lastname, avgrating, bio, picture) values ('epoe', 'Edgar Allen', 'Poe', '4.9', 'The gothiest goth to ever goth', 'url');
insert into authors (userid, firstname, lastname, avgrating, bio, picture) values ('egaskell', 'Elizabeth', 'Gaskell', '4.6', 'Austens goth twin', 'url');

-- Population some books
insert into books (authorid, title, cover, blurb, page_count, genreid) values
	((select id from authors where lastname like 'Austen'),
	'Pride and Prejudice',
	'url',
	'Will-they-wont-they in petticoats',
	'350',
	(select id from genres where name like 'romance'));
insert into books (authorid, title, cover, blurb, page_count, genreid) values
	((select id from authors where lastname like 'Austen'),
	'Northanger Abbey',
	'url',
	'How reading too many novels can send delicate young women mildly insane',
	'190',
	(select id from genres where name like 'romance'));
insert into books (authorid, title, cover, blurb, page_count, genreid) values
	((select id from authors where lastname like 'Gaskell'),
	'North and South',
	'url',
	'Look how awful and exploitative 19th century Northern English cotton mills were! But the main characters got married so its a happy ending',
	'460',
	(select id from genres where name like 'romance'));
insert into books (authorid, title, cover, blurb, page_count, approved, genreid) values
	((select id from authors where lastname like 'Shakespeare'),
	'The Tempest',
	'url',
	'Shipwrecks, monsters, and the meaning of humanity',
	'500',
	true,
	(select id from genres where name like 'classic'));
insert into books (authorid, title, cover, blurb, page_count, approved, genreid) values
	((select id from authors where lastname like 'Shakespeare'),
	'Hamlet',
	'url',
	'The Lion King but with fewer lions',
	'500',
	true,
	(select id from genres where name like 'classic'));
insert into books (authorid, title, cover, blurb, page_count, approved, genreid) values
	((select id from authors where lastname like 'King'),
	'It',
	'url',
	'The OG murderclown, and people fleeing their hometowns',
	'750',
	true,
	(select id from genres where name like 'horror'));
insert into books (authorid, title, cover, blurb, page_count, approved, genreid) values
	((select id from authors where lastname like 'King'),
	'Carrie',
	'url',
	'Being a teenage girl is brutal, but the telekinesis has its use',
	'100',
	true,
	(select id from genres where name like 'horror'));
insert into books (authorid, title, cover, blurb, page_count, approved, genreid) values
	((select id from authors where lastname like 'Tolstoy'),
	'War and Peace',
	'url',
	'Everyone is going to die',
	'3000',
	true,
	(select id from genres where name like 'classic'));
insert into books (authorid, title, cover, blurb, page_count, approved, genreid) values
	((select id from authors where lastname like 'Dahl'),
	'Charlie and the Chocolate Factory',
	'url',
	'All childhood flaws are punishable by death',
	'78',
	true,
	(select id from genres where name like 'young adult'));
insert into books (authorid, title, cover, blurb, page_count, approved, genreid) values
	((select id from authors where lastname like 'Dahl'),
	'James and the Giant Peach',
	'url',
	'The benefits of alternative, off-grid, plant-based housing',
	'120',
	true,
	(select id from genres where name like 'young adult'));
insert into books (authorid, title, cover, blurb, page_count, approved, genreid) values
	((select id from authors where lastname like 'Fleming'),
	'Casino Royale',
	'url',
	'The book so good they filmed it twice',
	'460',
	true,
	(select id from genres where name like 'action'));
insert into books (authorid, title, cover, blurb, page_count, approved, genreid) values
	((select id from authors where lastname like 'Fleming'),
	'From Russia With Love',
	'url',
	'Yesh, Mish Moneypenny, I am 007',
	'500',
	true,
	(select id from genres where name like 'action'));
insert into books (authorid, title, cover, blurb, page_count, approved, genreid) values
	((select id from authors where lastname like 'Verne'),
	'20,000 Leagues Under the Sea',
	'url',
	'Predicting the existence of submarines, and pointing out a lot of fish',
	'550',
	true,
	(select id from genres where name like 'adventure'));
insert into books (authorid, title, cover, blurb, page_count, approved, genreid) values
	((select id from authors where lastname like 'Verne'),
	'Journey to the Center of the Earth',
	'url',
	'Huh, its dark down here',
	'390',
	true,
	(select id from genres where name like 'adventure'));
insert into books (authorid, title, cover, blurb, page_count, approved, genreid) values
	((select id from authors where lastname like 'Sagan'),
	'Cosmos',
	'url',
	'The universe is pretty neat',
	'510',
	true,
	(select id from genres where name like 'nonfiction'));
insert into books (authorid, title, cover, blurb, page_count, approved, genreid) values
	((select id from authors where lastname like 'Martin'),
	'A Game of Thrones',
	'url',
	'The captivating start to an epic fantasy which will be concluded any day now',
	'1500',
	true,
	(select id from genres where name like 'fantasy'));
insert into books (authorid, title, cover, blurb, page_count, approved, genreid) values
	((select id from authors where lastname like 'Martin'),
	'The Winds of Winter',
	'url',
	'The satisfying final chapter of A Song of Ice and Fire',
	'10000',
	true,
	(select id from genres where name like 'fantasy'));
insert into books (authorid, title, cover, blurb, page_count, approved, genreid) values
	((select id from authors where lastname like 'Tolkien'),
	'The Fellowship of the Ring',
	'url',
	'The grandfather of modern high fantasy',
	'750',
	true,
	(select id from genres where name like 'fantasy'));
insert into books (authorid, title, cover, blurb, page_count, approved, genreid) values
	((select id from authors where lastname like 'Tolkien'),
	'The Two Towers',
	'url',
	'Starts partway through a long journey. Ends... slightly further along in the same journey',
	'800',
	true,
	(select id from genres where name like 'fantasy'));
insert into books (authorid, title, cover, blurb, page_count, approved, genreid) values
	((select id from authors where lastname like 'Tolkien'),
	'The Return of the King',
	'url',
	'See this, George RR Martin? THIS is how you finish an epic',
	'1200',
	true,
	(select id from genres where name like 'fantasy'));
insert into books (authorid, title, cover, blurb, page_count, approved, genreid) values
	((select id from authors where lastname like 'Christie'),
	'The Murder of Roger Ackroyd',
	'url',
	'Spoilers: Monsieur Poirot figures it out',
	'280',
	true,
	(select id from genres where name like 'mystery'));
insert into books (authorid, title, cover, blurb, page_count, approved, genreid) values
	((select id from authors where lastname like 'Christie'),
	'A Murder is Announced',
	'url',
	'Spoilers: Miss Marple figures it out',
	'500',
	true,
	(select id from genres where name like 'mystery'));
insert into books (authorid, title, cover, blurb, page_count, approved, genreid) values
	((select id from authors where lastname like 'Shelley'),
	'Frankenstein',
	'url',
	'Who is the true monster here?',
	'510',
	true,
	(select id from genres where name like 'sci-fi'));
insert into books (authorid, title, cover, blurb, page_count, approved, genreid) values
	((select id from authors where lastname like 'Adams'),
	'A Hitchhikers Guide to the Galaxy',
	'url',
	'Where spaceships hang in the air in the exact way that bricks do not',
	'300',
	true,
	(select id from genres where name like 'sci-fi'));
insert into books (authorid, title, cover, blurb, page_count, approved, genreid) values
	((select id from authors where lastname like 'Poe'),
	'The Fall of the House of Usher',
	'url',
	'Take care of your family estate, lest it fall into disrepair',
	'50',
	true,
	(select id from genres where name like 'horror'));

insert into toread (username, bookid) values ('jausten', 3);
insert into toread (username, bookid) values ('jausten', 4);
insert into toread (username, bookid) values ('wshakespeare', 3);