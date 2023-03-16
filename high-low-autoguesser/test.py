low = 1
high = 1000
mystery_number = 889

while True:
    guess = int((low + high)/2)
    if guess < mystery_number:
        low = guess
    elif guess > mystery_number:
        high = guess
    else:
        break

print('the number is', guess)
