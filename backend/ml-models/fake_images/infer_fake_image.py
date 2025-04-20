# train_fake_image.py

import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense, Dropout
import os

# Image Data Generator
datagen = ImageDataGenerator(rescale=1./255, validation_split=0.2)

train = datagen.flow_from_directory(
    'real_and_fake_face',  # folder should contain 'real/' and 'fake/' subfolders
    target_size=(128,128),
    class_mode='binary',
    batch_size=32,
    subset='training'
)

val = datagen.flow_from_directory(
    'real_and_fake_face',
    target_size=(128,128),
    class_mode='binary',
    batch_size=32,
    subset='validation'
)

# Model
model = Sequential([
    Conv2D(32, (3,3), activation='relu', input_shape=(128,128,3)),
    MaxPooling2D(2,2),
    Conv2D(64, (3,3), activation='relu'),
    MaxPooling2D(2,2),
    Flatten(),
    Dense(128, activation='relu'),
    Dropout(0.5),
    Dense(1, activation='sigmoid')
])

model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])
model.fit(train, validation_data=val, epochs=5)

# Save
os.makedirs("models", exist_ok=True)
model.save("models/fake_image_model.h5")
