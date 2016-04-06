install.packages("xlsx")
library(xlsx)
library(readxl)
library(dplyr)

getwd()
AQIdf <- read.csv("air_quality.csv")
head(AQIdf)
AQIdf <- na.omit(AQIdf)
AQIdf <- AQIdf%>%select(air_quaility, city, state) #%>%select(rank_number, city, rank1)


Crimedf <- read.csv("crime_index.csv")
head(Crimedf)
Crimedf <- na.omit(Crimedf)%>%select(rank_number, city, state)


jointdf <- merge(Crimedf, AQIdf, by = c("city", "state"))%>%mutate(rank1 = rank(air_quality))
head(jointdf)
 #jointdf id the dataFrame containing all the cities and their associated data values. 

#Function in T that takes in the 2 values and multiplies to get values
   


write.csv(supreme, file = "rankeDataFrame.csv")





