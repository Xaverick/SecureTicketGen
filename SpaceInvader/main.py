import pygame
import random
import math
from pygame import mixer

# initialise pygame
pygame.init()

# create the screen
screen = pygame.display.set_mode((800, 600))  # 800 pixels in width, 600 pixels in height

# Background
background = pygame.image.load('background.png')

# Background Sound
mixer.music.load('background_music.wav')
mixer.music.play(-1)
# if we had left the parenthesis empty, the music would run once only and then stopped
# for music to keep playing, we wrote -1 inside the parenthesis

# Caption and Icon
pygame.display.set_caption(title="Space Invaders")
icon = pygame.image.load('ufo.png')
pygame.display.set_icon(icon)

# Player
playerImg = pygame.image.load("player.png")
playerX = 370
playerY = 480
playerX_change = 0

# Enemy
enemyImg = []
enemyX = []
enemyY = []
enemyX_change = []
enemyY_change = []
num_of_enemies = 5

for i in range(0, num_of_enemies):
    enemyImg.append(pygame.image.load("enemy.png"))
    enemyX.append(random.randint(0, 735))
    enemyY.append(random.randint(50, 150))
    enemyX_change.append(2.5)
    enemyY_change.append(40)

# Bullet
# Ready --> You can't see the bullet on the screen
# Fire --> The bullet is currently moving
bulletImg = pygame.image.load("bullet.png")
bulletX = 0
bulletY = 480
bulletX_change = 2.5
bulletY_change = 7
bullet_state = "ready"

# Score
score_value = 0
font = pygame.font.Font("freesansbold.ttf", 32)
textX = 10
textY = 10

# Game Over Text
game_over_font = pygame.font.Font("freesansbold.ttf", 64)
game_over_textX = 200
game_over_textY = 250


def game_over_text(x, y):
    GM_text = game_over_font.render("GAME OVER", True, (255, 255, 255))
    screen.blit(GM_text, (x, y))


def show_score(x, y):
    # can't use blit, because we have to render a score and show an image
    # first render, then blit
    score = font.render(f"Score: {score_value}", True, (255, 255, 255))
    screen.blit(score, (x, y))


def player(x, y):
    screen.blit(playerImg, (x, y))


def enemy(x, y, i):
    screen.blit(enemyImg[i], (x, y))


def fire_bullet(x, y):
    global bullet_state
    bullet_state = "fire"
    screen.blit(bulletImg, (x + 16, y + 10))  # +16 and +10 to make bullet appear on the centre


def isCollision(enemyX, bulletX, enemyY, bulletY):
    distance = math.sqrt(math.pow((enemyX - bulletX), 2) + math.pow((enemyY - bulletY), 2))
    if distance < 27:
        return True
    else:
        return False


# Game Loop
running = True
while running:

    screen.fill((0, 0, 0))  # rgb
    screen.blit(background, (0, 0))
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

        # Keystroke presses check if it is left or right
        # Keydown --> keys are pressed
        # Keyup --> keys are released
        if event.type == pygame.KEYDOWN:
            if event.key == pygame.K_LEFT:
                playerX_change = -5
            if event.key == pygame.K_RIGHT:
                playerX_change = 5
            if event.key == pygame.K_SPACE:
                if bullet_state is "ready":
                    bullet_sound = mixer.Sound('laser.wav')
                    bullet_sound.play()
                    # gets the current x-coordinate of the spaceship in bullet abscissa
                    bulletX = playerX
                    fire_bullet(bulletX, bulletY)

        if event.type == pygame.KEYUP:
            if event.key == pygame.K_LEFT or event.key == pygame.K_RIGHT:
                playerX_change = 0

    # checking spaceship boundaries out of bound
    playerX += playerX_change

    if playerX <= 0:
        playerX = 0
    elif playerX >= (800 - 64):  # png size of the spaceship is 64x64px, so 800-64 = 736px
        playerX = 736

    # enemy movement
    for i in range(num_of_enemies):

        # Game Over
        if enemyY[i] > 440:
            for j in range(num_of_enemies):
                enemyY[j] = 2000
            game_over_text(game_over_textX, game_over_textY)
            break

        enemyX[i] += enemyX_change[i]
        if enemyX[i] <= 0:
            enemyX_change[i] = 2.5
            enemyY[i] += enemyY_change[i]
        elif enemyX[i] >= 736:
            enemyX_change[i] = -2.5
            enemyY[i] += enemyY_change[i]

        # Collision
        collision = isCollision(enemyX[i], bulletX, enemyY[i], bulletY)
        if collision:
            collision_sound = mixer.Sound('explosion.wav')
            collision_sound.play()
            bullet_state = "ready"
            score_value += 1
            bulletY = 480
            enemyX[i] = random.randint(0, 735)
            enemyY[i] = random.randint(50, 150)

        enemy(enemyX[i], enemyY[i], i)

    # bullet movement
    if bulletY <= 0:
        bulletY = 480
        bullet_state = "ready"

    if bullet_state is "fire":
        fire_bullet(bulletX, bulletY)
        bulletY -= bulletY_change

    player(playerX, playerY)
    show_score(textX, textY)

    pygame.display.update()
