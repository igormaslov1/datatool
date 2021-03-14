import pandas as pd
import numpy as np
from matplotlib import pyplot as plt 
import seaborn as sn
import statsmodels.formula.api as sm

#1 Import the data frame
madf = pd.read_excel(r"C:\Users\User 1\Desktop\metsAttendance.xlsx")

# print(madf) # prints entire data frame
# print(madf.head()) # prints first five
# print(madf.tail()) # prints last five

ismadf = madf[0:55] # select the in sample data
# print(ismadf.tail())

#2 Histograms of all variables

fig, ax = plt.subplots(2,2)
fig.suptitle("Histograms")
ax[0,0].hist(ismadf.iloc[:,1])
ax[0,0].set_title("Mets Attendance")
ax[1,0].hist(ismadf.iloc[:,2])
ax[1,0].set_title("obs")
ax[0,1].hist(ismadf.iloc[:,3])
ax[0,1].set_title("Win Percentage")
ax[1,1].hist(ismadf.iloc[:,4])
ax[1,1].set_title("Unemployment Rate")
fig.tight_layout()

#3 Timeseries plots of all variables (if applicable)

fig1, ax = plt.subplots(2,2)
fig1.suptitle("Time Series Graphs")
ax[0,0].plot(ismadf.iloc[:,1])
ax[0,0].set_title("Mets Attendance")
ax[1,0].plot(ismadf.iloc[:,2])
ax[1,0].set_title("obs")
ax[0,1].plot(ismadf.iloc[:,3])
ax[0,1].set_title("Win Percentage")
ax[1,1].plot(ismadf.iloc[:,4])
ax[1,1].set_title("Unemployment Rate")
fig1.tight_layout()

#4 Scatterplots

fig2, ax = plt.subplots(2,2)
fig2.suptitle("Scatterplots")
ax[0,0].scatter(ismadf.iloc[:,1], ismadf.iloc[:,2])
ax[0,0].set_title("Mets Attendance vs Obs")
ax[1,0].scatter(ismadf.iloc[:,1], ismadf.iloc[:,3])
ax[1,0].set_title("Mets Attendance vs Win Percentage")
ax[0,1].scatter(ismadf.iloc[:,1], ismadf.iloc[:,4])
ax[0,1].set_title("Mets Attendance vs Unemployment")

fig2.tight_layout()

plt.show()

#5 Discriptive statistics

print(ismadf.describe())

#6 Pivot tables

# There are no categorical variables but if there were use the following syntax:
# For single index
# table = pd.pivot_table(data=df,index=['column'])
# For multiple indecies
# table = pd.pivot_table(data=df,index=['column', 'column2])

#7 Correlation Matrix

print(ismadf.corr())

#8 Linear Model

result = sm.ols(formula="metsAtt ~ obs + winPct + unRate", data=ismadf).fit()
print(result.params)
print(result.summary())


#9 Residual Analysis/Diagnostic
