# ### RUBY CHEAT SHEET

# ### Running a ruby file in terminal
# $ ruby hello_world.rb

# ##############################
# ### Functions
# ##############################
# ## function definition
# def hello_world
# 	"hello world" # the last line in a ruby function is returned
# end # you use the end statement to close a function (JS equivalent of ending closing brace })

# # ## function call
# puts hello_world #puts command prints a statement, equivalent of console.log() in JS

# # if a puts statement is the last line of a ruby function, nil is returned, even if there is a non nil value before the puts statement
# # if empty last line, returns last non empty line
# def hello_world2
# 	8 
#  	puts "hello there" 
# end
# hello_world2 # returns nil

# ## passing a parameter to a ruby method
# # Note - string interpolation, must be done with double not single quotes
# def hello(person)
#   "hello #{person}" #equivalent of ~ "hello " + person
# end
# puts hello("shane")


##############################
### Yield
##############################
# yield statement allows you to pass and reuse a block

# def test 
#   puts "You are in the method" 
#   yield # equivalent of ~ puts "You are in the block"
#   puts "You are again back to the method" 
#   yield # equivalent of ~ puts "You are in the block"
# end 
# test {puts "You are in the block"} # the block (the section of code in the {} replaces the yield statement)

# ##############################
# ### Looping
# ##############################
# myArray = [1,3,6,7]

# # #Ex1
# # for i in 0...4 # excludes printing 4, .. would include printing 4
# # 	# puts i 
# # 	puts myArray[i]
# # end

# # myArray.each {|x| puts x}

# # #Ex2 using a block 
# # myArray.each {|x| puts x}

# # #Ex3 using a do block
# myArray.each do |x|
# 	y = 3
# 	puts x + y
# end




