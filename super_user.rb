##### Example 1 #####
# how to define a class
# how to initialize a method (in python it is __init__ )
# passing a parameter to initializing






# class SuperUser
# 	def initialize(name)
# 		puts name
# 	end
# end
# s1 = SuperUser.new("Shane")
# puts s1















# # ##### Example 2 #####
# # # instance variable
# # # getter and setter
# class SuperUser
# 	# attr_reader :name
#   # attr_writer :name
#   attr_accessor :name

#   def initialize(name)
# 		@name = name
# 		# puts @name
# 	end

# 	# def name
# 	# 	@name
# 	# end

# 	# def name=(name)
# 	# 	@name = name
# 	# end
# end
# s1 = SuperUser.new("Shane")
# # # s2 = SuperUser.new("Soumya")
# # # puts s1
# # # s1.crazymethod("sh")
# puts s1.name

# s1.name = "Pariece"
# puts s1.name


















##### Example 3 #####
# class method instead of instance method

# class Calc

# 	@@total = 0

# 	def self.add(num)
# 		@@total += num
# 	end
# 	# 	Alternative Syntax 
# 		# class << self
# 		# 	def add(num)
# 		#     @@total += num
# 		# 	end
# 		# end
# end

# puts Calc.add(5)
# puts Calc.add(2)

# # # # error
# c = Calc.new
# c.add(3)





# # OOP Class Quiz


























# class Person
#   attr_accessor :name

#   @@count = 0


#   def initialize(name)
#     @name = name
#     @@count +=1
#     # puts @@count
#   end

#   # def name
#   #   @name
#   # end

#   # def name=(name)
#   #   @name = name
#   # end

#   def Person.count
#     @@count
#   end

# end

# p1 = Person.new("Shane")
# p1 = Person.new("Shane")
# p1 = Person.new("Shane")
# puts p1.class.count
# # p1.name = "Connie"
# # puts p1.name
# # puts p1.count
# # puts Person.count









##### Example 4 #####
# private vs public
# Example 4 and 5 below all refer to instance methods, not class methods
# private and public refer to WHERE a method can be called from, 
# a public method can be called from code outside the class, a private method cannot be
# Regardless of whether an instance method is public or private, it still needs to be called by an instance of the class(an object)

# Translation for code below: "do_something" which is a private method can be called only from within the calling object (in other words, within the class definition, meaning between the line that says "class SuperUser" and its corresponding "end" statement). It cannot be called from outside the calling object. "s1.do_something" which is outside the calling object will cause an error
# If do_something were a public method, then "s1.do_something" would work.
# s1.display_info will also work, because display_info is a public method. It is okay that display_info calls do_something, bc display_info is defined from inside the class.

# If you call self.do_something, even from within the class definition, it is not considered a direct call from inside the calling object (inside the object meaning inside self), and will not work if do_something is private

# class SuperUser

# 	def initialize(name)
# 		@name = name
# 		do_something   
# 	end

#   def display_info # workaround_for_do_something being private
#     do_something #self.do_something would fail
#   end

# 	private
# 	def do_something
# 		puts "did something"
# 	end

# end 

# s1 = SuperUser.new("Shane")
# # s1.do_something # this generates an error
# s1.display_info # this works










##### Example 5 #####
# private vs public vs protected
# show that there is an error if I change this to private
# Protected methods can be called by any instance of the defining class or its subclasses. (our example uses below uses and instance of the defining class)
# Private methods can be called only from within the calling object. 

# Translation for code below: 
# Age is a protected method. Because it is a protected method and not a public method, p1.age will not work
# if age were a private method, p1.age would also not work

# in the older_than method? "puts age" will work, it is considered calling the age method from within the calling object
# <puts age> in the older_than? method will work if the age method is private, protected, or public
# <puts other_person.age>  in the older_than? method would work if age is protected or public, but NOT if age is private. 

# in the method older_than?
# p1 is the calling object and within p1, we are trying to access the age method of a different object "other_person" (iotw p2) 
# this will not work if age is private, however it will work if age is protected bc p1 is an object of the same class as p2

class Person
  
	def initialize(age)
		@age = age
	end

  def older_than?(other_person)
    puts age
    puts other_person.age #this works bc age is protected, and would not work if age were private
    # age > other_person.age
  end

  private
  def age
    @age
  end
end


p1 = Person.new(5)
p2 = Person.new(6) 
puts p1.older_than?(p2)

# will not work
# puts p1.age