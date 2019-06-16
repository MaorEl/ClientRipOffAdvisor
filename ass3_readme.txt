hello
to run the website, you have to run at first the server on your local host. so run the project from this link:
https://github.com/MaorElfassy/RipOffAdvisor
after that, you can run the website on this link:
https://anaelgor.github.io/ClientRipOff/.

some login users:
username: password
a: 		  a
maorelf:  111
kitzi: 	  1212
pillow:	  1212
natasha:  12345
itzikd:   12121212

changes in the api:
1. we have removed the "/private" before "getAllQuestions" / "getAllCountries" / "getThreeRandom" because we realized they're not only for signed users.
2. we added "getUserQuestion/:username" because we wanted to get only the specific user question and not all users questions, for security reasons.
3. we added "getAllInterestPointsByCategorySortedByRank/:categoryID" because only now we realized we have to give the users the option to sort the intereset point by rank. 
we though we will do that on client side, but then we though about the future, 
and what will be if will have 15,000 interest points? 
probably it's better to do that on server side.

addons:
1. bonus part of map with our interest points has been implemented. see that on About page

Thanks and Enjoy,
Maor, Itzik and Anael